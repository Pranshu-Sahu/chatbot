// src/lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}
const options = {};

// 1️⃣ Create your single MongoClient instance
const client = new MongoClient(uri, options);

// 2️⃣ Cache the connection promise on global (only in dev)
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === 'development'
    ? // Reuse existing promise in dev to avoid hot-reload issues
      global._mongoClientPromise ?? (global._mongoClientPromise = client.connect())
    : // In prod, just connect once
      client.connect();

// 3️⃣ Export a helper to get the connected DB
export async function connectToDB(): Promise<Db> {
  const conn = await clientPromise;
  return conn.db();
}
