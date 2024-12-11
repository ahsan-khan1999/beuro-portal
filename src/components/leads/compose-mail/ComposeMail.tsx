import { Form } from "@/base-components/form/form";
import { useSendLeadEmail } from "@/hooks/leads/useSendLeadEmail";
import ContractFormCard from "@/layout/contract/ContractFormCard";
import React from "react";

const ComposeLeadMail = ({
  backRouteHandler,
}: {
  backRouteHandler: Function;
}) => {
  const { fields, onSubmit, handleSubmit, errors, translate } =
    useSendLeadEmail(backRouteHandler);

  return (
    <ContractFormCard>
      <h2 className="text-[#fff] text-xl font-medium bg-[#4A13E7] py-5 px-6 rounded-t-lg">
        {translate("common.lead_mail_preview")}
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

export default ComposeLeadMail;
