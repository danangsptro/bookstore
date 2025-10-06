const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET || 'secret_example';
const EXPIRES = '1h';
function signToken(payload) {
  const tokenId = uuidv4();
  const token = jwt.sign({ ...payload, tokenId }, SECRET, { expiresIn: EXPIRES });
  return { token, tokenId };
}
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
module.exports = { signToken, verifyToken };
