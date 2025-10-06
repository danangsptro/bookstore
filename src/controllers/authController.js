const bcrypt = require('bcrypt');
const userRepo = require('../repositories/userRepository');
const { signToken, verifyToken } = require('../utils/tokenUtil');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password, name, role } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'email & password required' });
      const existing = await userRepo.findByEmail(email);
      if (existing) return res.status(400).json({ error: 'email already used' });
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await userRepo.create({ email, passwordHash, name, role: role === 'admin' ? 'admin' : 'customer' });
      res.json({ id: user.id, email: user.email, role: user.role });
    } catch (err) { next(err); }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'email & password required' });
      const user = await userRepo.findByEmail(email);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

      const { token, tokenId } = signToken({ userId: user.id });
      await userRepo.updateTokenId(user.id, tokenId);
      res.json({ accessToken: token, expiresIn: 3600, user: { id: user.id, email: user.email, role: user.role } });
    } catch (err) { next(err); }
  },

  logout: async (req, res, next) => {
    try {
      const ah = req.headers['authorization'];
      if (!ah) return res.json({ ok: true });
      const token = ah.split(' ')[1];
      if (!token) return res.json({ ok: true });
      let payload;
      try { payload = verifyToken(token); } catch (e) { return res.json({ ok: true }); }
      await userRepo.invalidateToken(payload.userId);
      res.json({ ok: true });
    } catch (err) { next(err); }
  }
};
