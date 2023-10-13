import { Form } from "@/base-components/form/form";
import { userContactSupport } from "@/hooks/userContactSupport";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const ContactSupportForm = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error, renderModal } =
    userContactSupport();
  return (
    <>
    
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Submit your request</h2>

      </div>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </FormCard>
    {renderModal()}
    </>
  );
};

export default ContactSupportForm;
