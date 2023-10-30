import { Form } from "@/base-components/form/form";
import useSettingProfile from "@/hooks/setting/useSettingProfile";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const SettingProfile = () => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error, control } = useSettingProfile();
  return (
    <FormCard>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </FormCard>
  );
};

export default SettingProfile;
