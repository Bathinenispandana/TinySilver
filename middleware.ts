import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  // Check if the request is for the admin subdomain
  // This works for admin.tinysilver.com in production and admin.localhost:3000 locally
  if (hostname.startsWith("admin.")) {
    // Prevent infinite rewriting if it already starts with /admin
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// Ensure the middleware only runs for relevant paths (ignore static files, images, etc.)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - \.webp, \.png, \.jpg (images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:webp|png|jpg)).*)",
  ],
};
