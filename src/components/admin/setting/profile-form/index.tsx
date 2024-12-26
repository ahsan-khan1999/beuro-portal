import { Form } from "@/base-components/form/form";
import useSettingProfile from "@/hooks/admin/setting/useSettingProfile";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const SettingProfile = () => {
  const { fields, onSubmit, handleSubmit, errors, renderModal } =
    useSettingProfile();

  return (
    <FormCard containerClassName="pt-3 px-6">
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
      {renderModal()}
    </FormCard>
  );
};

export default SettingProfile;
