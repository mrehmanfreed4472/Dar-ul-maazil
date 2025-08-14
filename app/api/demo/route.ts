import { NextRequest, NextResponse } from 'next/server'
import { DemoResponse } from '@/lib/api'

export async function GET(request: NextRequest) {
  try {
    const response: DemoResponse = {
      message: "Hello from Next.js API route",
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Demo API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
