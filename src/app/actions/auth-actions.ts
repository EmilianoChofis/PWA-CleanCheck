"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth/auth";

export const loginAction = async (values: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    return { error: "An error occurred" };
  }
};
