import React from "react";
import companyIcon from "@/assets/svgs/company-details.svg";
import Image from "next/image";
import { Form } from "@/base-components/form/form";
import { useDetailLocation } from "@/hooks/auth/useDetailLocation";
import { detailLocationFormField } from "../login/login-fields";
import { FormComponentProps } from "@/types";
import { useAppSelector } from "@/hooks/useRedux";
import { DetailScreensCard } from "@/layout/detailScreensCard";

const Location = ({
  onSubmit,
  handleSubmit,
  errors,
  register,
  control,
  currentFormStage,

  setCurrentFormStage,
}: FormComponentProps) => {
  const defaultClassName = "mt-4";
  // const { fields, onSubmit, handleSubmit, errors, error } = useDetailLocation();
  const { loading } = useAppSelector((state) => state.auth);
  const fields = detailLocationFormField(
    register,
    loading,
    control,

    setCurrentFormStage
  );
  return (
    <DetailScreensCard currentFormStage={currentFormStage}>
      <div className="px-[52px] pt-[52px] pb-11">
        <h1
          onClick={() => setCurrentFormStage("companyDetails")}
          className="text-[#000] text-[26px] font-medium tracking-[-0.2px] mb-3"
        >
          Tell Us About Your Location
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

export default Location;
