import { Form } from "@/base-components/form/form";
import { userContactSupport } from "@/hooks/contact/userContactSupport";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const ContactSupportForm = ({
  requestSubmitHandler,
}: {
  requestSubmitHandler: Function;
}) => {
  const defaultClassName = "mt-[30px]";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    userContactSupport(requestSubmitHandler);

  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] border-b border-black border-opacity-10">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("contact_support.main_heading")}
        </h2>
      </div>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </FormCard>
  );
};

export default ContactSupportForm;
