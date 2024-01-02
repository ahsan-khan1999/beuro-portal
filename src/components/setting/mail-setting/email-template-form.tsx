import { Form } from "@/base-components/form/form";
import React from "react";
import SettingLayout from "../SettingLayout";
import { useMailSettingsTemplate } from "@/hooks/setting/useMailSettingTemplate";

export const EmailTemplateForm = ({ handleCreation }: { handleCreation: Function }) => {
  const defaultClassName = " ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useMailSettingsTemplate(handleCreation);
  return (
    <SettingLayout containerClassName="bg-white py-7 px-8 shadow-0-3-10-0">
      <p className="text-base font-medium text-[#4B4B4B] mb-[35px]">
        Logo Setting
      </p>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </SettingLayout>
  );
};
