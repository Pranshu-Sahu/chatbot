// src/lib/jwt.ts
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

// 1️⃣ Pull the raw env var
const _secret = process.env.JWT_SECRET;
if (!_secret) {
  throw new Error(
    'Please define the JWT_SECRET environment variable in .env.local'
  );
}

// 2️⃣ Now TS knows `secret` is a valid `Secret` (string | Buffer | …)
const secret: Secret = _secret;

// 3️⃣ Our `signToken` uses an explicit SignOptions
export function signToken(
  payload: object,
  // you can even tie this default to the same SignOptions type:
  expiresIn: SignOptions['expiresIn'] = '1h'
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
}

export function verifyToken<T = any>(token: string): T {
  // you can also pass in the same options object here if you like
  return jwt.verify(token, secret) as T;
}
