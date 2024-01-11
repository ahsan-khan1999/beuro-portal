import React, { useEffect, useId, useMemo, useState } from "react";
import EmailCard from "./PdfCard";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import dynamic from "next/dynamic";
import { useMergedPdfDownload } from "@/components/reactPdf/generate-merged-pdf-download";
import { PdfPreviewProps } from "@/types";
import { useContractPdf } from "@/hooks/contract/useContractPdf";
import OfferPdf from "@/components/offers/offer-pdf-preview";
import { useTranslation } from "next-i18next";

const ContractPdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  { ssr: false }
);
// const ContractPdfPreview = dynamic(
//   () => import("@/components/reactPdf/offer-pdf-preview"),
//   { ssr: false, loading: () => <LoadingState /> }
// );

// const PdfDownload = dynamic(
//   () => import("@/components/reactPdf/generate-merged-pdf-download"),
//   {
//     ssr: false,
//   }
// );

// const PdfDownload = dynamic(() => import("./generate-offer-pdf"), { ssr: false });

const PdfDownload = dynamic(
  () => import("@/components/reactPdf/generate-Pdf-Download"),
  { ssr: false }
);

const PdfPriview = () => {
  const {
    contractData,
    loading,
    modal,
    activeButtonId,
    router,
    templateSettings,
    emailTemplateSettings,
    loadingGlobal,
    qrCodeUrl,
    remoteFileBlob,
    mergedPdfUrl,
    isPdfRendering,
    dispatch,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    systemSetting,
  } = useContractPdf();

  const randomId = useId();

  const { t: translate } = useTranslation();
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.email_sent_des")}
        route={onSuccess}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.update_contract_heading")}
        subHeading={translate("common.modals.email_sent_des")}
        route={() => {
          dispatch(updateModalType({ type: ModalType.NONE }));
          router.back();
        }}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      {loading || loadingGlobal ? (
        <LoadingState />
      ) : (
        <>
          <EmailCard
            contractStatus={contractData?.emailHeader?.emailStatus}
            contractNo={contractData?.emailHeader?.offerNo}
            onEmailSend={handleEmailSend}
            loading={loading}
            onDownload={handleDonwload}
            onPrint={handlePrint}
            contractTitle={contractData?.emailHeader?.contractTitle || ""}
            worker={contractData?.emailHeader?.worker || ""}
            onSendViaPost={handleSendByPost}
            activeButtonId={activeButtonId}
          />

          <ContractPdfPreview
            mergedPdfFileUrl={mergedPdfUrl}
            isPdfRendering={isPdfRendering}
          />
          {renderModal()}
        </>
      )}
    </>
  );
};

export default PdfPriview;
