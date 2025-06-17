import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '../../../lib/mongodb';
import { signToken } from '../../../lib/jwt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // 1) Find the user
    const user = await users.findOne<{ _id: any; password: string }>({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 2) Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3) Sign a JWT
    const token = signToken({ userId: user._id.toString() });

    // 4) Return it to the client
    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
