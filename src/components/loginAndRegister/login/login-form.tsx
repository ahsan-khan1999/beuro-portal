import { Form } from "@/base-components/form/form";
import { LoginFormProps } from "@/types";
export const LoginForm = ({
  className,
  fields,
  onSubmit,
  handleSubmit,
  errors,
}: LoginFormProps) => {
  const defaultClassName = "mt-[30px] max-w-[384px] w-full ";
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
