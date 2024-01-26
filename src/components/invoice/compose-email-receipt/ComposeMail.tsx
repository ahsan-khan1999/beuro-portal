import { Form } from "@/base-components/form/form";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useContractEmail } from "@/hooks/contract/useContractEmail";
import { useReceiptEmail } from "@/hooks/invoice/useReceiptEmail";
import ContractFormCard from "@/layout/contract/ContractFormCard";
import { useRouter } from "next/router";
import React from "react";

const ComposeMail = () => {
  const router = useRouter()
  const defaultClassName = "";
  const onNextHandle = () => {
    router.push("/contract/pdf-preview");
  };
  const backRouteHandler = () => {
    router.push("/contract/details");
  };
  const { fields, control, onSubmit, handleSubmit, errors, error, translate, loading, loadingContent, modal, onClose, onSuccess } =
    useReceiptEmail(backRouteHandler, onNextHandle);
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.invoice_update")}
        route={onSuccess}
      />
    ),

  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  return (
    <>
      <ContractFormCard>
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("invoice.receipt_card.receipt_email_preview")}
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
      {renderModal()}
    </>
  );
};

export default ComposeMail;
