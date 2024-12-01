import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role?.toString();
        session.user.token = token.token?.toString();
      }
      return session;
    },
  },
});
