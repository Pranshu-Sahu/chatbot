// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/jwt';
import { connectToDB } from '@/lib/mongodb';

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ parse & validate body
    const { email, password } = (await request.json()) as LoginBody;

    // 2️⃣ lookup user in DB
    const db = await connectToDB();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3️⃣ verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 4️⃣ sign & return token
    const token = signToken({ userId: user._id.toString() });
    return NextResponse.json({ token });

  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
