"use client";
import React, { useState } from "react";
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  const handleForgetPassword = () => {
    console.log("Olvidaste tu contraseña");
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
              onChange={(e) => setEmail(e.target.value)}
              iconLeft={<EmailOutlined />}
              placeholder="Correo electrónico"
            />
            <TextInput
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
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
            />
          </div>
          <ButtonCustom
            className="w-full"
            variant="filled"
            type="submit"
            backgroundColor="primary"
            icon={<InputOutlined />}
            colorText="background"
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
