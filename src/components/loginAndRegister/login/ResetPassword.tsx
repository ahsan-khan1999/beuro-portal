import React from "react";
import logo from "@/assets/svgs/logo.svg";
import Image from "next/image";

import EntryLinks from "../EntryLinks";
import { Form } from "@/base-components/form/form";
import useResetPassword from "@/hooks/auth/useResetPassword";

const ResetPassword = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, onSubmit, handleSubmit, errors, error } = useResetPassword();

  return (
    <div className="w-[50%] px-7 flex flex-col justify-between">
      <Image src={logo} alt="Buro Logo" className="mt-5" />
      <div className="px-[32px] flex flex-col justify-center pt-3 ">
        <div className=" max-w-[384px] w-full  ">
          <h1 className="font-semibold text-dark text-[26px] text-center">
            Create New Password
          </h1>
          <span className="mt-3 text-xs text-[#8F8F8F] flex justify-center">
            Manage your business with us
          </span>

          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            className={`${defaultClassName}`}
          />
        </div>
      </div>
      <EntryLinks />
    </div>
  );
};

export default ResetPassword;
