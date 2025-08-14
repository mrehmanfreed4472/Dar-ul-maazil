import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const ping = process.env.PING_MESSAGE ?? "ping"
    
    return NextResponse.json({ message: ping })
  } catch (error) {
    console.error('Ping API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
