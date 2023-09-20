import Image from "next/image";
// import { Poppins } from "next/font/google";
import logo from "@/assets/svgs/logo.svg";
import { useLoginForm } from "@/hooks/auth/useLogin";
import { LoginForm } from "@/components/loginAndRegister/login/login-form";
import Link from "next/link";
import betterManagementIcon from "@/assets/pngs/better-management.png";

export default function Home() {
  const { fields, onSubmit, handleSubmit, errors, error } = useLoginForm();
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mx-auto max-w-[1030px]   shadow ">
        <div className="p-[14px] flex  ">
          <div className="w-[50%] px-7">
            <Image src={logo} alt="Buro Logo" className="mt-5" />
            <div className="px-8">
              <div className="mt-[123px] max-w-[384px] w-full ">
                <h1 className="font-semibold text-dark text-[26px] text-center ">
                  Sign in to Büro-365
                </h1>
                <span className="mt-3 text-xs text-[#8F8F8F] flex justify-center">
                  Manage your business with us
                </span>

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
            <div className="space-x-[18px] flex justify-center mt-[94px]">
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
          <div
            className="w-[50%] flex flex-col justify-center  px-8"
            style={{
              // backgroundImage: 'url("/assets/svgs/calender-icon.svg")',
              // backgroundPosition: "4% 50%",
              background: "#4A13E7",
            }}
          >
            <Image
              src={betterManagementIcon}
              alt="Better Management Icon"
              className="mx-auto"
            />
            <h2 className="font-semibold text-white text-[32px] text-center">
              Better management
            </h2>
            <p className="text-white text-xs mt-2 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
