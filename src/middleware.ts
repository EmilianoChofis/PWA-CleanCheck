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
  
  console.log("Token completo:", token);
  console.log("URL actual:", nextUrl.pathname);
  console.log("Auth actual:", auth);

  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (token?.role) {
    let redirectNeeded = false;
    const targetRole = token.role;

    if (maidRoutes.some((route) => nextUrl.pathname.startsWith(route)) && targetRole !== "maid") {
      redirectNeeded = true;
    }

    if (recepcionistRoutes.some((route) => nextUrl.pathname.startsWith(route)) && targetRole !== "receptionist") {
      redirectNeeded = true;
    }

    if (managerRoutes.some((route) => nextUrl.pathname.startsWith(route)) && targetRole !== "manager") {
      redirectNeeded = true;
    }

    if (redirectNeeded) {
      const redirectUrl = new URL(`/${targetRole}/home`, nextUrl);
      console.log("Redirigiendo a:", redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};