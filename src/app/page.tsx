"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { validateEmail, validatePassword } from "./utils/Validations";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value) || "",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value) || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fakeToken = "test-token";

    document.cookie = `authToken=${fakeToken}; path=/;`;

    router.push("/home");
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="px-2 py-2">
            <TextInput
              label="Correo"
              type="email"
              required
              onChange={handleEmailChange}
              iconLeft={<EmailOutlined />}
              placeholder="Correo electrónico"
              error={errors.email}
            />
            <TextInput
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              required
              onChange={handlePasswordChange}
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
              error={errors.password}
            />
          </div>
          <ButtonCustom
            className="w-full"
            variant="filled"
            type="submit"
            backgroundColor="primary"
            icon={<InputOutlined />}
            colorText="background"
            disabled={
              !email || !password || !!errors.email || !!errors.password
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
