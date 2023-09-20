import { Form } from "@/base-components/form/form";
import { RegistrationFormProps } from "@/types";
export const RegisterationForm = ({
  fields,
  handleSubmit,
  onSubmit,
  errors,
}: RegistrationFormProps) => {
  return (
    <Form
      formFields={fields}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      className="mt-[30px] max-w-[580px] w-full px-4"
    />
  );
};
