import { Form } from "@/base-components/form/form";
import { RegistrationFormProps } from "@/types";
export const RegisterationForm = ({
  fields,
  handleSubmit,
  onSubmit,
  errors,
}: RegistrationFormProps) => {
  const defaultClassName = "mt-4  ";
  return (
    <Form
      formFields={fields}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      className={`${defaultClassName} `}
    />
  );
};
