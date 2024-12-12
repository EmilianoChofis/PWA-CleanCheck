import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.role = user.role?.toLowerCase();
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ? token.id.toString() : "";
        session.user.role = token.role?.toString().toLowerCase();
        session.user.token = token.token?.toString();
      }
      return session;
    },
  },
  trustHost: true,
});
