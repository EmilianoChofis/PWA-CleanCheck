import { db } from "@/app/lib/db";
import { loginSchema } from "@/app/lib/zod";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
