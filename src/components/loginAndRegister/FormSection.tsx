import React from "react";
import logo from "@/assets/svgs/logo.svg";
import { LoginForm } from "@/components/loginAndRegister/login/login-form";
import { useLoginForm } from "@/hooks/auth/useLogin";
import Link from "next/link";
import Image from "next/image";
import { RegisterationForm } from "./register/register-form";
import useRegistration from "@/hooks/auth/useRegistration";
import EntryLinks from "./EntryLinks";
import useResetPassword from "@/hooks/auth/useResetPassword";
import useFrogetPassword from "@/hooks/auth/useFrogetPassword";

const FormSection = ({ heading, name }: any) => {
  const { fields, onSubmit, handleSubmit, errors, error } =
    name == "login"
      ? useLoginForm()
      : name == "register"
      ? useRegistration()
      : useFrogetPassword();
  return (
    <div className="w-[50%] px-7 flex flex-col justify-between">
      <Image src={logo} alt="Buro Logo" className="mt-5" />
      <div className="px-[32px] flex flex-col justify-center pt-3 ">
        <div className=" max-w-[384px] w-full  ">
          <h1 className="font-semibold text-dark text-[26px] text-center ">
            {heading}
          </h1>
          <span className="mt-3 text-xs text-[#8F8F8F] flex justify-center">
            Manage your business with us
          </span>
          {name == "login" ? (
            <LoginForm
              fields={fields}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          ) : (
            <RegisterationForm
              fields={fields}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          )}
        </div>
      </div>
      <EntryLinks />
    </div>
  );
};

export default FormSection;
