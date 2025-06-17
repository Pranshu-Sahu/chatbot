import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

// GET /api/test-db
export async function GET() {
  try {
    const db = await connectToDB();
    await db.admin().ping(); // lightweight "are you alive?" call
    return NextResponse.json({ status: "connected" });
  } catch (err) {
    console.error("DB connection error:", err);
    return NextResponse.json(
      { status: "error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
