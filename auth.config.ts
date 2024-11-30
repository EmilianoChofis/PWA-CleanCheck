import { loginSchema } from "@/app/lib/zod";
import { login } from "@/app/utils/auth-service";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = await loginSchema.parseAsync(credentials);

        const {
          data: { user, token },
        } = await login(email, password);

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
          token: token,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
