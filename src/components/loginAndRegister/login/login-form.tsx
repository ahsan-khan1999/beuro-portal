import { Form } from "@/base-components/form/form";
import { LoginFormProps } from "@/types";
export const LoginForm = ({
  className,
  fields,
  onSubmit,
  handleSubmit,
  errors,
}: LoginFormProps) => {
  const defaultClassName = "mt-[30px] max-w-[580px] w-full px-4";
  return (
    <>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName} ${className}`}
      />
    </>
  );
};
