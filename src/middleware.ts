import NextAuth from "next-auth";
import authConfig from "./auth/auth.config";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ["/", "/recoverPassword", "/resetPassword"];
const maidRoutes = ["/maid"];
const recepcionistRoutes = ["/receptionist"];
const managerRoutes = ["/manager"];

export default middleware(async (req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("token", token);

  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (maidRoutes.some((route) => nextUrl.pathname.startsWith(route)) && token?.role !== "maid") {
    return NextResponse.redirect(new URL(`/${token?.role}/home`, nextUrl));
  }

  if (
    recepcionistRoutes.some((route) => nextUrl.pathname.startsWith(route)) &&
    token?.role !== "receptionist"
  ) {
    return NextResponse.redirect(new URL(`/${token?.role}/home`, nextUrl));
  }

  if (managerRoutes.some((route) => nextUrl.pathname.startsWith(route)) && token?.role !== "manager") {
    return NextResponse.redirect(new URL(`/${token?.role}/home`, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
