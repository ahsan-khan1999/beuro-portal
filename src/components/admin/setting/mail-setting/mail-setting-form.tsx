import { Form } from "@/base-components/form/form";
import { useChangeMailSetting } from "@/hooks/admin/setting/useChangeMailSetting";
import React from "react";

const MailSettingForm = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
  useChangeMailSetting();
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
