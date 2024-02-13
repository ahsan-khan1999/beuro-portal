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
      <h2 className="text-[#393939] text-lg font-medium border-b border-b-[#000] border-opacity-10 pb-5 mb-6">
        {translate("common.offer_mail_preview")}
      </h2>

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
