const { verifyToken } = require('../utils/tokenUtil');
const userRepo = require('../repositories/userRepository');

module.exports = async function auth(req, res, next) {
  try {
    const ah = req.headers['authorization'];
    if (!ah) return res.status(401).json({ error: 'No auth header' });
    const parts = ah.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Malformed auth header' });
    const token = parts[1];
    let payload;
    try { payload = verifyToken(token); }
    catch (e) { return res.status(401).json({ error: 'Invalid or expired token' }); }

    const user = await userRepo.findById(payload.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!user.currentTokenId || user.currentTokenId !== payload.tokenId) {
      return res.status(401).json({ error: 'Session invalidated (single device enforced)' });
    }

    req.user = user;
    req.tokenPayload = payload;
    next();
  } catch (err) { next(err); }
};
