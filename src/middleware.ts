import NextAuth from "next-auth";
import authConfig from "./auth/auth.config";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Definir las rutas específicas para cada rol
const maidRoutes = [
  "/maid/home",
  "/maid/tasks",
  "/maid/profile",
];

const receptionistRoutes = [
  "/receptionist/home",
  "/receptionist/appointments",
  "/receptionist/profile",
];

const publicRoutes = ["/", "/recoverPassword", "/resetPassword"];

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Redirección para usuarios no autenticados
  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Redirección si el usuario no tiene el rol "maid"
  if (maidRoutes.some((route) => nextUrl.pathname.startsWith(route)) && token?.role !== "maid") {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  // Redirección si el usuario no tiene el rol "receptionist"
  if (
    receptionistRoutes.some((route) => nextUrl.pathname.startsWith(route)) &&
    token?.role !== "receptionist"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
