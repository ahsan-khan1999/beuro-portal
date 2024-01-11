import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { InvoiceEmailHeader } from "./invoice-email-header";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { useReceiptPdf } from "@/hooks/invoice/useReceiptPdf";
import dynamic from "next/dynamic";
import { useId } from "react";
import { useTranslation } from "next-i18next";

// const InvoicePdfPreview = dynamic(
//   () => import("@/components/reactPdf/pdf-layout"),
//   { ssr: false }
// );

const InvoicePdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  { ssr: false, loading: () => <LoadingState /> }
);

// const PdfDownload = dynamic(
//   () => import("@/components/reactPdf/generate-merged-pdf-download"),
//   {
//     ssr: false,
//   }
// );
const PdfDownload = dynamic(
  () => import("@/components/reactPdf/generate-Pdf-Download"),
  { ssr: false }
);

const ReceiptPdfPreview = () => {
  const {
    emailTemplateSettings,
    loading,
    loadingGlobal,
    modal,
    receiptData,
    templateSettings,
    activeButtonId,
    router,
    mergedPdfUrl,
    isPdfRendering,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    dispatch,
  } = useReceiptPdf();

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
          <InvoiceEmailHeader
            {...receiptData?.emailHeader}
            contentName={receiptData?.emailHeader.contentName}
            onEmailSend={handleEmailSend}
            loading={loading}
            onDownload={handleDonwload}
            onPrint={handlePrint}
            onSendViaPost={handleSendByPost}
            activeButtonId={activeButtonId}
            title={
              router.pathname?.includes("receipt")
                ? "Receipt Details"
                : "Invoice Details"
            }
          />
          <InvoicePdfPreview
            mergedPdfFileUrl={mergedPdfUrl}
            isPdfRendering={isPdfRendering}
          />
          {renderModal()}
        </>
      )}
    </>
  );
};

export default ReceiptPdfPreview;
