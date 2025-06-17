import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '../../../lib/mongodb';

const saltRounds = 10;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // 1) Check if already registered
    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // 2) Hash the password
    const hashed = await bcrypt.hash(password, saltRounds);

    // 3) Insert new user
    await users.insertOne({ email, password: hashed });

    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
