import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'shubhyog_secret';

function generateToken(payload) {
  return sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export default { generateToken };
