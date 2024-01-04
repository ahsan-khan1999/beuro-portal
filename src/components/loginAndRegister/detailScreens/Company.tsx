import React from "react";

import { Form } from "@/base-components/form/form";

import { FormComponentProps } from "@/types";
import { detailScreensFormField } from "../login/login-fields";
import { useAppSelector } from "@/hooks/useRedux";
import { DetailScreensCard } from "@/layout/detailScreensCard";
import { useTranslation } from "next-i18next";

const Company = ({
  onSubmit,
  handleSubmit,
  errors,
  register,
  control,
  currentFormStage,
  user,
}: FormComponentProps) => {
  const { loading } = useAppSelector((state) => state.auth);
  const fields = detailScreensFormField(register, loading, control, user);
  const { t: translate } = useTranslation();

  return (
    <DetailScreensCard currentFormStage={currentFormStage}>
      <div className="px-[52px] pt-[52px] pb-11">
        <h1 className="text-[#000] text-[26px] font-medium tracking-[-0.2px] mb-3">
          {translate("login_detail.company_details.heading")}
        </h1>
        <p className="text-xs text-dark tracking-[0.36px] mb-[56px]">
          {translate("login_detail.company_details.sub_heading")}
        </p>
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </DetailScreensCard>
  );
};

export default Company;
