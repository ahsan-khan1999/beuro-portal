import { Form } from "@/base-components/form/form";
import useQRSettings from "@/hooks/setting/useQRSettings";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const QRSettings = ({ handleCreation }: { handleCreation: Function }) => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, error, renderModal } =
    useQRSettings({
      handleCreation,
    });

  return (
    <FormCard>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
      {renderModal()}
    </FormCard>
  );
};

export default QRSettings;
