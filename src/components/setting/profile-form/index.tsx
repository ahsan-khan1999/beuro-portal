import { Form } from "@/base-components/form/form";
import useSettingProfile from "@/hooks/setting/useSettingProfile";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const SettingProfile = ({
  handleChangePassword,
}: {
  handleChangePassword: Function;
}) => {
  const { fields, onSubmit, handleSubmit, errors, renderModal } =
    useSettingProfile(handleChangePassword);

  return (
    <FormCard containerClassName="pb-6">
      <div className="py-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
      {renderModal()}
    </FormCard>
  );
};

export default SettingProfile;
