import { Form } from "@/base-components/form/form";
import usePaymentSettings from "@/hooks/admin/setting/usePaymentSettings";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const PaymentSettings = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, onSubmit, handleSubmit, errors } =
    usePaymentSettings();
  return (
    <FormCard>
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
