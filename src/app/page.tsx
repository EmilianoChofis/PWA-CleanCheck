"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import { getRole, loginAction } from "@/app/actions/auth-actions";
import { loginSchema } from "@/app/lib/zod";


const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getSession = async () => {
    const role = await getRole();
    console.log("Este es el rol", role);
    setIsLoading(false);
    router.push(`${role}/home`);
  };

  useEffect(() => {
    setIsLoading(true);
    const checkSession = async () => {
      const role = await getRole();
      setIsLoading(false);
      if (role) {
        router.push(`${role}/home`);
      }
    };
    checkSession();
  }, []);

  const onSubmitHandler = async (values: z.infer<typeof loginSchema>) => {
    const response = await loginAction(values);
    startTransition(() => {
      setIsLoading(true);
      if (response.success) {
        getSession();
      } else {
        setIsLoading(false);
        setError(response.error);
      }
    });
  };

  const handleForgetPassword = () => {
    router.push("/resetPassword");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Banner />
      <div className="w-full md:w-1/2 p-6 md:p-8 font-[family-name:var(--font-jost-medium)]">
        <Title className="text-3xl font-bold text-primary mb-6" title="Iniciar sesión" />
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="bg-white rounded-lg shadow-md p-6">
          <div>
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
              iconRight={showPassword ? <VisibilityOutlined onClick={handlePasswordVisibility} /> : <VisibilityOffOutlined onClick={handlePasswordVisibility} />}
              onIconClick={handlePasswordVisibility}
              placeholder="••••••••••••••"
              error={form.formState.errors.password?.message}
            />
            <p className="mt-2 text-sm text-red-500">{error ? error : " "}</p>
          </div>
          <ButtonCustom
            className="w-full mt-6"
            variant="filled"
            type="submit"
            backgroundColor="primary"
            icon={<InputOutlined />}
            colorText="background"
            disabled={!!form.formState.errors.email || !!form.formState.errors.password || isPending}
            isLoading={isLoading}
          >
            Iniciar sesión
          </ButtonCustom>
        </form>
        <div className="text-center mt-6">
          <ButtonCustom variant="text" colorText="primary" onClick={handleForgetPassword}>
            ¿Olvidaste tu contraseña?
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;