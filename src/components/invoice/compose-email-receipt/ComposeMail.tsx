import { Form } from "@/base-components/form/form";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useReceiptEmail } from "@/hooks/invoice/useReceiptEmail";
import ContractFormCard from "@/layout/contract/ContractFormCard";
import { useRouter } from "next/router";
import React from "react";

const ComposeMail = () => {
  const router = useRouter();

  const onNextHandle = () => {
    router.push("/contract/pdf-preview");
  };

  const backRouteHandler = () => {
    router.push("/contract/details");
  };

  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
    loading,
    loadingContent,
    modal,
    onClose,
    onSuccess,
  } = useReceiptEmail(backRouteHandler, onNextHandle);

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
        <h2 className="text-[#fff] text-lg font-medium bg-[#4A13E7] py-5 px-6 rounded-t-lg">
          {translate("invoice.receipt_card.receipt_email_preview")}
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
      {renderModal()}
    </>
  );
};

export default ComposeMail;
