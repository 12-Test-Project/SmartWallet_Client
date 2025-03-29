import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  })
}

