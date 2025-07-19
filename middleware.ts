import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "your-strong-secret-here";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("authToken")?.value;
  const isAdminRoute = pathname.startsWith("/admin");

  const publicRoutes = ['/auth/login', '/auth/signup', '/'];
  const protectedRoutes = ['/browse', '/add-item', '/dashboard'];
  const adminRoutes = ['/admin'];

  try {
    if (isAdminRoute) {
      if (!authToken) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      const secretKey = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(authToken, secretKey);
      
      if (!payload.isAdmin) {
        const response = NextResponse.redirect(new URL("/", req.url));
        response.cookies.set({
          name: "authError",
          value: "Admin access denied",
          path: "/",
          maxAge: 5
        });
        return response;
      }
      return NextResponse.next();
    }

    if (publicRoutes.includes(pathname)) {
      if (authToken && (pathname === "/auth/login" || pathname === "/auth/signup")) {
        return NextResponse.redirect(new URL("/browse", req.url));
      }
      return NextResponse.next();
    }

    if (!authToken) {
      if (protectedRoutes.includes(pathname) || pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL(`/auth/login?redirect=${pathname}`, req.url));
      }
      return NextResponse.next();
    }

    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(authToken, secretKey);

    if (adminRoutes.includes(pathname) && !payload.isAdmin) {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.set({
        name: "authError",
        value: "Admin access denied",
        path: "/",
        maxAge: 5
      });
      return response;
    }

    return NextResponse.next();

  } catch (error) {
    console.error("Authentication error:", error);

    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("authToken");
    response.cookies.set({
      name: "authError",
      value: "Session expired",
      path: "/",
      maxAge: 5
    });
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};