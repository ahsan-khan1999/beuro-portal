import { Form } from "@/base-components/form/form";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { useContractEmail } from "@/hooks/contract/useContractEmail";
import { useInvoiceEmail } from "@/hooks/invoice/useInvoiceEmail";
import ContractFormCard from "@/layout/contract/ContractFormCard";
import { useRouter } from "next/router";
import React from "react";

const ComposeMail = () => {
  const router = useRouter()
  const onNextHandle = () => {
    router.push("/contract/pdf-preview");
  };
  const backRouteHandler = () => {
    router.push("/contract/details");
  };
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate, loading, loadingContent } =
    useInvoiceEmail(backRouteHandler, onNextHandle);
  return (
    <>

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
    </>
  );
};

export default ComposeMail;
