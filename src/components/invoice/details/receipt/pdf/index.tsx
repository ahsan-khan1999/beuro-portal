import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { InvoiceEmailHeader } from "./invoice-email-header";
import { useReceiptPdf } from "@/hooks/invoice/useReceiptPdf";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

// const InvoicePdfPreview = dynamic(
//   () => import("@/components/reactPdf/pdf-layout"),
//   { ssr: false }
// );

const InvoicePdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  { ssr: false, loading: () => <CustomLoader /> }
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
    collectiveInvoiceDetails,
    systemSetting,
  } = useReceiptPdf();

  const { t: translate } = useTranslation();
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.receipt_update")}
        route={onSuccess}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.update_success")}
        route={() => {
          dispatch(updateModalType({ type: ModalType.NONE }));
        }}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <InvoiceEmailHeader
            {...receiptData?.emailHeader}
            contractStatus={collectiveInvoiceDetails?.emailStatus}
            contentName={receiptData?.emailHeader.contentName}
            onEmailSend={handleEmailSend}
            loading={loading}
            onDownload={handleDonwload}
            onPrint={handlePrint}
            onSendViaPost={handleSendByPost}
            activeButtonId={activeButtonId}
            title={translate("invoice.receipt_details")}
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
