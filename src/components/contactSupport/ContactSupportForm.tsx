import { Form } from "@/base-components/form/form";
import { userContactSupport } from "@/hooks/contact/userContactSupport";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const ContactSupportForm = ({
  requestSubmitHandler,
}: {
  requestSubmitHandler: Function;
}) => {
  const { fields, onSubmit, handleSubmit, errors, translate } =
    userContactSupport(requestSubmitHandler);

  return (
    <FormCard containerClassName="mb-5 xMini:mb-0">
      <div className="flex justify-between items-center bg-primary py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-base xMini:text-xl font-medium">
          {translate("contact_support.main_heading")}
        </h2>
      </div>
      <div className="p-[9px] xMini:py-3 xMini:px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </FormCard>
  );
};

export default ContactSupportForm;
