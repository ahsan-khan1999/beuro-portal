import { Form } from "@/base-components/form/form";
import useSettingProfile from "@/hooks/admin/setting/useSettingProfile";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const SettingProfile = () => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, error, renderModal } =
    useSettingProfile();

  return (
    <FormCard containerClassName="py-3 px-6">
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
      {renderModal()}
    </FormCard>
  );
};

export default SettingProfile;
