"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Banner from "./(pages)/(auth)/_components/banner";
import TextInput from "./_components/text_input";
import {
  EmailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  InputOutlined,
} from "@mui/icons-material";
import ButtonCustom from "./_components/button_custom";
import Title from "./_components/title";
import { loginAction } from "@/app/actions/auth-actions";
import { loginSchema } from "@/app/lib/zod";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof loginSchema>) => {
    const response = await loginAction(values);
    startTransition(() => {
      if (response.success) {
        router.push("/maid/home");
      } else {
        setError(response.error);
      }
    });
  };

  const handleForgetPassword = () => {
    // router.push("/recoverPassword");
    router.push("/resetPassword");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex">
      <Banner />
      <div className="w-full md:w-1/2 p-8 font-[family-name:var(--font-jost-medium)]">
        <Title className="text-2xl text-primary" title="Iniciar sesión" />
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-4"
        >
          <div className="px-2 py-2">
            <TextInput
              label="Correo"
              {...form.register("email")}
              type="email"
              iconLeft={<EmailOutlined />}
              placeholder="Correo electrónico"
              error={form.formState.errors.email?.message}
            />
            <TextInput
              label="Contraseña"
              {...form.register("password")}
              type={showPassword ? "text" : "password"}
              iconLeft={<LockOutlined />}
              iconRight={
                showPassword ? (
                  <VisibilityOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )
              }
              onIconClick={handlePasswordVisibility}
              placeholder="••••••••••••••"
              error={form.formState.errors.password?.message}
            />
            {
              <p className="mt-2 text-sm text-error">
                {error ? error : " "}
              </p>
            }
          </div>
          <ButtonCustom
            className="w-full"
            variant="filled"
            type="submit"
            backgroundColor="primary"
            icon={<InputOutlined />}
            colorText="background"
            disabled={
              !!form.formState.errors.email ||
              !!form.formState.errors.password ||
              isPending
            }
          >
            Iniciar sesión
          </ButtonCustom>
        </form>
        <div className="text-center py-4">
          <ButtonCustom
            variant="text"
            colorText="primary"
            onClick={handleForgetPassword}
          >
            ¿Olvidaste tu contraseña?
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
