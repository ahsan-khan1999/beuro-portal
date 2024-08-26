import { Form } from "@/base-components/form/form";
import { userContactSupport } from "@/hooks/contact/userContactSupport";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const ContactSupportForm = ({
  requestSubmitHandler,
}: {
  requestSubmitHandler: Function;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    userContactSupport(requestSubmitHandler);

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-primary py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("contact_support.main_heading")}
        </h2>
      </div>
      <div className="py-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
    </FormCard>
  );
};

export default ContactSupportForm;
