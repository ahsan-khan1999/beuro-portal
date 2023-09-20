import React from "react";
import logo from "@/assets/svgs/logo.svg";
import { LoginForm } from "@/components/loginAndRegister/login/login-form";
import { useLoginForm } from "@/hooks/auth/useLogin";
import Link from "next/link";
import Image from "next/image";
import { RegisterationForm } from "./register/register-form";
import useRegistration from "@/hooks/auth/useRegistration";

const FormSection = () => {
  const { fields, onSubmit, handleSubmit, errors, error } = useRegistration();
  return (
    <div className="w-[50%] px-7 flex flex-col justify-between">
      <Image src={logo} alt="Buro Logo" className="mt-5" />
      <div className="px-[32px] flex flex-col justify-center pt-3 ">
        <div className=" max-w-[384px] w-full  ">
          {/* mt-[123px] */}
          <h1 className="font-semibold text-dark text-[26px] text-center ">
            Sign in to Büro-365
          </h1>
          <span className="mt-3 text-xs text-[#8F8F8F] flex justify-center">
            Manage your business with us
          </span>
          <RegisterationForm
            fields={fields}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            errors={errors}
          />
          {/* <div className="mt-6 text-sm flex justify-center text-dark">
            Don't have an account?
            <Link href={""} className="text-primary">
              &nbsp;Sign Up
            </Link>
          </div> */}
        </div>
      </div>
      <div className="space-x-[18px] flex items-center justify-center    ">
        {/* mt-[94px] */}
        <select className="text-xs text-[#8F8F8F] focus:outline-none">
          <option>English</option>
          <option>German</option>
        </select>
        <Link href={""} className="text-xs text-[#8F8F8F]">
          Privacy Policy
        </Link>
        <Link href={""} className="text-xs text-[#8F8F8F]">
          Copyright 2023
        </Link>
      </div>
    </div>
  );
};

export default FormSection;
