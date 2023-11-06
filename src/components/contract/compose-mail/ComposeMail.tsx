import { Form } from "@/base-components/form/form";
import { useContractEmail } from "@/hooks/contract/useContractEmail";
import ContractFormCard from "@/layout/contract/ContractFormCard";
import React from "react";

const ComposeMail = ({backRouteHandler} : {backRouteHandler:Function}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useContractEmail(backRouteHandler);
  return (
    <ContractFormCard>
      <h2 className="text-[#393939] text-lg font-medium">
        Contract Email Preview
      </h2>

      <hr className="opacity-20 mt-[25px] mb-5" />

      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </ContractFormCard>
  );
};

export default ComposeMail;
