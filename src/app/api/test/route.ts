import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY as string;

  return NextResponse.json(
    {
      apiKey: apiKey,
    },
    { status: 200 }
  );
}
