// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Dummy logic
    let response = 'Sorry, I did not understand that.';

    if (message.toLowerCase().includes('hello')) {
      response = 'Hi there! How can I help you today?';
    } else if (message.toLowerCase().includes('bye')) {
      response = 'Goodbye! Have a great day.';
    } else {
      response = `You said: "${message}"`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Dummy API error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
