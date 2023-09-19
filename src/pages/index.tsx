import Image from "next/image";
// import { Poppins } from "next/font/google";
import logo from "@/assets/svgs/logo.svg";
import emailIcon from "@/assets/svgs/input-email.svg";
import { useLoginForm } from "@/hooks/auth/useLogin";
import { LoginForm } from "@/components/loginAndRegister/login/login-form";
import Link from "next/link";

export default function Home() {
  const { fields, onSubmit, handleSubmit, errors, error } = useLoginForm();
  return (
    <div className="p-[14px]">
      <Image src={logo} alt="Buro Logo" />
      <div className="px-8">
        <div className="mt-[123px] max-w-[384px] w-full ">
          <h1 className="font-semibold text-dark text-[26px] text-center ">
            Sign in to Büro-365
          </h1>
          <span className="mt-3 text-xs text-[#8F8F8F] flex justify-center">
            Manage your business with us
          </span>
          {/* <div className="mt-4">
          <label className="text-[#1E1E1E] text-sm mb-3">Email</label>
          <div className=" relative">
            <Image src={emailIcon} alt="Email Icon" className="absolute" />
            <input
              type="text"
              className=" p-[14px] focus:border-[#4A13E7] focus:outline-none border border-[#BFBFBF] rounded-lg text-sm text-[#1E1E1E]"
            />
          </div>
        </div> */}

          <LoginForm
            fields={fields}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            errors={errors}
          />
          <div className="mt-6 text-sm flex justify-center text-dark">
            Don't have an account?
            <Link href={""} className="text-primary">
              &nbsp;Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="space-x-4 flex justify-center">
        <Link href={""} className="text-xs text-[#8F8F8F]">
          English
        </Link>
        <Link href={""} className="text-xs text-[#8F8F8F]">
          Privacy Policy
        </Link>
        <Link href={""} className="text-xs text-[#8F8F8F]">
          Copyright 2023
        </Link>
      </div>
    </div>
  );
}
