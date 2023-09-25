import React from "react";
import companyIcon from "@/assets/svgs/company-details.svg";
import Image from "next/image";
import { Form } from "@/base-components/form/form";
import { useDetailScreens } from "@/hooks/auth/useDetailScreens";
import { FormComponentProps } from "@/types";
import { detailScreensFormField } from "../login/login-fields";
import { useAppSelector } from "@/hooks/useRedux";
import { DetailScreensCard } from "@/layout/detailScreensCard";

const Company = ({
  onSubmit,
  handleSubmit,
  errors,
  register,
  control,
}: FormComponentProps) => {
  const defaultClassName = "mt-4";
  // const { fields } = useDetailScreens();
  const { loading } = useAppSelector((state) => state.auth);
  console.log(onSubmit);

  const fields = detailScreensFormField(register, loading, control);

  return (
    <DetailScreensCard>
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
    </DetailScreensCard>
  );
};

export default Company;
