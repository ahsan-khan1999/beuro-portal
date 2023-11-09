import { Form } from "@/base-components/form/form";
import { useChangeMailSetting } from "@/hooks/setting/useChangeMailSetting";
import React from "react";

const MailSettingForm = ({handleCreation} : {handleCreation:Function}) => {
  const defaultClassName = " ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
  useChangeMailSetting(handleCreation);
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
