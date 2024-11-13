"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Banner from "../_components/banner";
import Title from "@/app/_components/title";
import TextInput from "@/app/_components/text_input";
import ButtonCustom from "@/app/_components/button_custom";
import { EmailOutlined, KeyboardArrowRight } from "@mui/icons-material";
import { validateEmail } from "@/app/utils/validations";

const RecoverPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value) || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
  };

  return (
    <div className="min-h-screen flex">
      <Banner />
      <div className="w-full md:w-1/2 p-8 font-[family-name:var(--font-jost-medium)]">
        <Title
          className="text-2xl text-primary px-2 py-4"
          title="Recuperar contraseña"
        />
        <p className="text-primary px-2 py-2">
          Introduce el correo asociado a tu cuenta para recibir instrucciones de
          recuperación.
        </p>
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
          </div>
          <ButtonCustom
            className="w-full"
            variant="filled"
            type="submit"
            backgroundColor="primary"
            icon={<KeyboardArrowRight className="text-background" />}
            colorText="background"
            disabled={!email || !!errors.email}
          >
            Enviar correo
          </ButtonCustom>
        </form>
        <div className="text-center py-4">
          <ButtonCustom
            variant="text"
            backgroundColor="transparent"
            onClick={() => router.push("/")}
          >
            Regresar
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
