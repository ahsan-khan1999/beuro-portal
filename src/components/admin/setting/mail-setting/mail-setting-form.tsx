import React from "react";
import { Form } from "@/base-components/form/form";
import { useChangeMailSetting } from "@/hooks/admin/setting/useChangeMailSetting";

const MailSettingForm = ({
  handleCreation,
  selectedTab,
}: {
  handleCreation: () => void;
  selectedTab: number;
}) => {
  const { fields, onSubmit, handleSubmit, errors, error } =
    useChangeMailSetting({ handleCreation, selectedTab });

  return (
    <>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </>
  );
};

export default MailSettingForm;
