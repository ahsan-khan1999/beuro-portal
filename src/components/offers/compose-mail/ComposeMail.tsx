import { Form } from "@/base-components/form/form";
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
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useSendEmail(backRouteHandler, onNextHandle);

  return (
    <ContractFormCard>
      <h2 className="text-[#fff] text-xl font-medium bg-[#4A13E7] py-5 px-6 rounded-t-lg">
        {translate("common.offer_mail_preview")}
      </h2>
      <div className="py-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </ContractFormCard>
  );
};

export default ComposeMail;
