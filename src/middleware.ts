import NextAuth from "next-auth";
import authConfig from "./auth/auth.config";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ["/", "/recoverPassword", "/resetPassword"];
const maidRoutes = ["/maid"];
const recepcionistRoutes = ["/recepcionist"];

export default middleware(async (req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (maidRoutes.some((route) => nextUrl.pathname.startsWith(route)) && token?.role !== "maid") {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (
    recepcionistRoutes.some((route) => nextUrl.pathname.startsWith(route)) &&
    token?.role !== "recepcionist"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
