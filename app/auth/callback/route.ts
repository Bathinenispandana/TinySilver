import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      // Return the exact error so we can debug it
      return new NextResponse(`Supabase Auth Error: ${error.message}`, { status: 400 })
    }
  }

  // If there's no code, tell us what the URL actually looked like
  return new NextResponse(`No 'code' parameter found in the URL. URL was: ${request.url}`, { status: 400 })
}
