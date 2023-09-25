import React from "react";
import companyIcon from "@/assets/svgs/company-details.svg";
import Image from "next/image";
import { Form } from "@/base-components/form/form";
import { useDetailBank } from "@/hooks/auth/useDetailBank";
import { FormComponentProps } from "@/types";
import {
  detailBankFormField,
  detailScreensFormField,
} from "../login/login-fields";
import { useAppSelector } from "@/hooks/useRedux";

const Bank = ({
  onSubmit,
  handleSubmit,
  errors,
  register,
  control,
}: FormComponentProps) => {
  const defaultClassName = "mt-4";
  // const { fields, onSubmit, handleSubmit, errors, error } = useDetailBank();
  const { loading } = useAppSelector((state) => state.auth);
  console.log(onSubmit);

  const fields = detailBankFormField(register, loading, control);
  return (
    <div className="flex flex-col justify-center min-h-screen mx-10">
      <div className="mx-auto max-w-[890px] w-full rounded-2xl    shadow-loginCard bg-white">
        <div className="grid grid-cols-3 bg-[#FAFAFA] rounded-tl-2xl rounded-tr-2xl min-w-full">
          <div className="flex justify-center items-center pl-[53px] pr-11 py-4  bg-primary rounded-r-[24px] rounded-tl-2xl cursor-pointer w-full">
            <Image src={companyIcon} alt="Company Icon" className="mr-[10px]" />
            <h2 className="text-sm text-white font-semibold tracking-[0.42px]">
              Company Details
            </h2>
          </div>
          <div className="flex  justify-center items-center py-4 mx-auto cursor-pointer w-full">
            <Image src={companyIcon} alt="Company Icon" className="mr-[10px]" />
            <h2 className="text-sm text-[#B9B9B9] font-semibold tracking-[0.42px]">
              Location Details
            </h2>
          </div>
          <div className="flex justify-center items-center py-4 mx-auto cursor-pointer w-full">
            <Image src={companyIcon} alt="Company Icon" className="mr-[10px]" />
            <h2 className="text-sm text-[#B9B9B9] font-semibold tracking-[0.42px]">
              Bank Details
            </h2>
          </div>
        </div>
        <div className="px-[52px] pt-[52px] pb-11">
          <h1 className="text-[#000] text-[26px] font-medium tracking-[-0.2px] mb-3">
            Tell Us About Your Company
          </h1>
          <p className="text-xs text-dark tracking-[0.36px] mb-[56px]">
            Lorem ipsum dollar smith amit dolem isplum sumip alpsum .
          </p>
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            className={`${defaultClassName}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Bank;
