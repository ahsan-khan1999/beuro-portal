import { Form } from "@/base-components/form/form";
import { useContractEmail } from "@/hooks/contract/useContractEmail";
import { useSendEmail } from "@/hooks/offers/useSendEmail";
import ContractFormCard from "@/layout/contract/ContractFormCard";
import React from "react";

const ComposeMail = ({
  backRouteHandler,
  onNextHandle,
}: {
  backRouteHandler: Function;
  onNextHandle: Function;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useSendEmail(backRouteHandler, onNextHandle);
  return (
    <ContractFormCard>
      <h2 className="text-[#393939] text-lg font-medium">
        {translate("contracts.contract_email_preview.heading")}
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
