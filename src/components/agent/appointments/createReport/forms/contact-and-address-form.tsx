import React from "react";
import { Form } from "@/base-components/form/form";
import { FormComponentProps } from "@/types";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import { contactAgentReportFormField } from "../fields/contact-address-form-fields";

export const ContactAndAddressReport = ({
  onSubmit,
  handleSubmit,
  errors,
  register,
  control,
  currentFormStage,
  setCurrentFormStage,
}: FormComponentProps) => {
  const { loading } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();

  const fields = contactAgentReportFormField(
    register,
    loading,
    control,
    setCurrentFormStage
  );

  return (
    <div className="p-[21px] bg-white rounded-lg">
      <h1 className="text-[#1E1E1E] text-base font-semibold mb-2">
        {translate("agent.contact_detail_heading")}
      </h1>

      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
};
