import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      toker?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    token?: string;
  }

  declare module "next-auth/jwt" {
    interface JWT {
      role?: string;
      token?: string;
    }
  }
}
