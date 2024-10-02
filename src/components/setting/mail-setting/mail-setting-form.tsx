import { Form } from "@/base-components/form/form";
import { useChangeMailSetting } from "@/hooks/setting/useChangeMailSetting";
import React from "react";

export interface MailSettingFormProps {
  handleCreation: Function;
  selectedTab: number;
}
export const MailSettingForm = ({
  handleCreation,
  selectedTab,
}: MailSettingFormProps) => {
  const { fields, onSubmit, handleSubmit, errors } = useChangeMailSetting(
    handleCreation,
    selectedTab
  );

  return (
    <Form
      formFields={fields}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
