import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { InvoiceEmailHeader } from "./invoice-email-header";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { useInvoicePdf } from "@/hooks/invoice/useInvoicePdf";
import dynamic from "next/dynamic";
import { useId } from "react";

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

const DetailsPdfPriview = () => {
  const {
    activeButtonId,
    invoiceData,
    router,
    modal,
    loadingGlobal,
    loading,
    translate,
    mergedPdfUrl,
    isPdfRendering,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    dispatch,
    onClose,
    onSuccess,
  } = useInvoicePdf();

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.invoice_update")}
        route={onSuccess}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.invoice_update")}
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
            {...invoiceData?.emailHeader}
            contentName={invoiceData?.emailHeader.contentName}
            onEmailSend={handleEmailSend}
            loading={loading}
            onDownload={handleDonwload}
            onPrint={handlePrint}
            onSendViaPost={handleSendByPost}
            activeButtonId={activeButtonId}
            title={translate("invoice.invoice_details")}
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

export default DetailsPdfPriview;
