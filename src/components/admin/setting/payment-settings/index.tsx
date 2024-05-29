import { Form } from "@/base-components/form/form";
import usePaymentSettings from "@/hooks/admin/setting/usePaymentSettings";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const PaymentSettings = () => {
  const defaultClassName = "  ";
  const { fields, onSubmit, handleSubmit, errors } = usePaymentSettings();

  return (
    <FormCard containerClassName="py-6 px-4">
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

export default PaymentSettings;
