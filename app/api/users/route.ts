import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const rows = db.prepare('SELECT * FROM users').all();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { name, email } = body;
      const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
      const result = stmt.run(name, email);
  
      // Fetch the newly created user
      const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  
      return NextResponse.json(newUser); // Return the newly created user

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
