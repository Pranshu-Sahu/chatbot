import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('Please define the JWT_SECRET environment variable in .env.local');
}

// Sign a payload (e.g. user ID) into a token
export function signToken(payload: object, expiresIn = '1h'): string {
  return jwt.sign(payload, secret, { expiresIn });
}

// Verify a token, returns the decoded payload or throws
export function verifyToken(token: string): any {
  return jwt.verify(token, secret);
}
