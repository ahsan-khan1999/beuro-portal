import { CustomHookFormProps, FormProps, HookFieldProps } from "@/types";
import React from "react";
import { RenderFields } from "./render-fields";

export const useFormFields = ({
  formFields,
  errors,
  handleSubmit,
  onSubmit,
}: FormProps) => {
  const fields = formFields.reduce<HookFieldProps>(
    (acc, fieldData) => {
      const fieldId = fieldData?.field.id;

      acc[fieldId] = <RenderFields   {...fieldData} errors={errors} />;
      return acc;
    },
    {}
  );

  const FormComponent = ({ children, className }: CustomHookFormProps) => (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>{children}</form>
  );

  return {
    fields,
    Form: FormComponent,
  };
};
