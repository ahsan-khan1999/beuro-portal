import { Form } from "@/base-components/form/form";
import { useContractEmail } from "@/hooks/contract/useContractEmail";
import ContractFormCard from "@/layout/contract/ContractFormCard";
import React from "react";

const ComposeMail = ({ backRouteHandler }: { backRouteHandler: Function }) => {
  const { fields, onSubmit, handleSubmit, errors, translate } =
    useContractEmail(backRouteHandler);

  return (
    <div className="mb-5">
      <ContractFormCard>
        <h2 className="text-[#fff] text-lg font-medium bg-[#4A13E7] py-5 px-6 rounded-t-lg">
          {translate("contracts.contract_email_preview.heading")}
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
    </div>
  );
};

export default ComposeMail;
