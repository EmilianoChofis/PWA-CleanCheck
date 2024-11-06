"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Banner from "../_components/banner";
import Title from "@/app/_components/title";
import TextInput from "@/app/_components/text_input";
import ButtonCustom from "@/app/_components/button_custom";
import {
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  KeyboardArrowRight,
} from "@mui/icons-material";

const RecoverPasswordPage: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ password, confirmPassword });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex">
      <Banner />
      <div className="w-full md:w-1/2 p-8 font-[family-name:var(--font-jost-medium)]">
        <Title
          className="text-2xl text-primary px-2 py-4"
          title="Cambiar contraseña"
        />
        <p className="text-primary px-2 py-2">
          Introduce tu nueva contraseña y confírmala.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="px-2 py-2">
            <TextInput
              label="Contraseña nueva"
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
              onIconClick={handleShowPassword}
              placeholder="Ingresa tu nueva contraseña"
            />
            <TextInput
              label="Confirmar contraseña"
              type={showConfirmPassword ? "text" : "password"}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              iconLeft={<LockOutlined />}
              iconRight={
                showConfirmPassword ? (
                  <VisibilityOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )
              }
              onIconClick={handleShowConfirmPassword}
              placeholder="Confirma tu nueva contraseña"
            />
          </div>
          <ButtonCustom
            className="w-full"
            variant="filled"
            type="submit"
            backgroundColor="primary"
            icon={<KeyboardArrowRight className="text-background" />}
            colorText="background"
          >
            Cambiar contraseña
          </ButtonCustom>
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
