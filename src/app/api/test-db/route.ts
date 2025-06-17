import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb"; // <-- keep the relative path

// GET /api/test-db
export async function GET() {
  try {
    const client = await clientPromise; // waits for the shared connection
    await client.db().admin().ping(); // lightweight “are you alive?” call
    return NextResponse.json({ status: "connected" });
  } catch (err) {
    console.error("DB connection error:", err);
    return NextResponse.json(
      { status: "error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
