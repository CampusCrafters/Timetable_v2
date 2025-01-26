import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()


  const adminEmailPattern = /.*@iiitkottayam\.ac\.in$/
  const dashboardEmailPattern = /([a-z]+)(\d{2})([a-z]{3})(\d*)@iiitkottayam\.ac\.in/

  if (!user) {

    if (
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.startsWith('/dashboard')
    ) {
      const url = process.env.NEXT_PUBLIC_URL  || 'http://localhost:3000/';
      return NextResponse.redirect(url);
    }
  } 
  else {
    if(user.email && adminEmailPattern.test(user.email) && !dashboardEmailPattern.test(user.email)){
      console.log('redirecting to /admin')
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }

    if ( request.nextUrl.pathname.startsWith('/admin') && (!user.email || !adminEmailPattern.test(user.email) || (user.email && dashboardEmailPattern.test(user.email) && ! (user.email == "vijay23bcs7@iiitkottayam.ac.in")))) {
      console.log('redirecting to /unauthorized')
      const url = request.nextUrl.clone()
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    }

    if (
      request.nextUrl.pathname.startsWith('/dashboard') &&
      (!user.email || (user.email && !dashboardEmailPattern.test(user.email)))
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

