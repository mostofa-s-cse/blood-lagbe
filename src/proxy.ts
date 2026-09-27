import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"
import type { Role } from "@/lib/roles"

const intlMiddleware = createMiddleware(routing)

function stripLocale(pathname: string) {
  const match = pathname.match(/^\/(bn|en)(\/.*)?$/)
  return match ? match[2] ?? "/" : pathname
}

export async function proxy(request: NextRequest) {
  const response = intlMiddleware(request)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = stripLocale(request.nextUrl.pathname)
  const role = (user?.user_metadata?.role as Role | undefined) ?? undefined

  const isProtected = path.startsWith("/dashboard") || path.startsWith("/admin")
  const isAdminRoute = path.startsWith("/admin")

  if (isProtected && !user) {
    const locale = request.nextUrl.pathname.match(/^\/(bn|en)/)?.[1] ?? routing.defaultLocale
    const loginUrl = new URL(`/${locale}/login`, request.url)
    loginUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute && role !== "ADMIN") {
    const locale = request.nextUrl.pathname.match(/^\/(bn|en)/)?.[1] ?? routing.defaultLocale
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
