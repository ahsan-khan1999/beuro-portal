import { Form } from "@/base-components/form/form";
import { useChangeMailSetting } from "@/hooks/admin/setting/useChangeMailSetting";
import React from "react";

const MailSettingForm = ({
  handleCreation,
  selectedTab,
}: {
  handleCreation: () => void;
  selectedTab: number;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useChangeMailSetting({ handleCreation, selectedTab });

  return (
    <>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </>
  );
};

export default MailSettingForm;
