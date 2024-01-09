import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { InvoiceEmailHeader } from "./invoice-email-header";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { useReceiptPdf } from "@/hooks/invoice/useReceiptPdf";
import dynamic from "next/dynamic";
import { useId } from "react";

const InvoicePdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  { ssr: false }
);
const PdfDownload = dynamic(
  () => import("@/components/reactPdf/generate-merged-pdf-download"),
  {
    ssr: false,
  }
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
    pdfFile,
    qrCodeUrl,
    setPdfFile,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    dispatch,
  } = useReceiptPdf();
  const randomId = useId();

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Email Sent Successfully "
        subHeading="Thanks for updating offer we are happy to have you. "
        route={onSuccess}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Status Update Successful "
        subHeading="Thanks for updating offer we are happy to have you. "
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
      {loading ? (
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
          {/* <YogaPdfContainer>
            <div className="my-5">
              <Pdf<InvoiceEmailHeaderProps>
                pdfData={receiptData}
                newPageData={newPageData}
                templateSettings={templateSettings}
                totalPages={calculateTotalPages}
                isQr={true}
                emailTemplateSettings={emailTemplateSettings}
              />
            </div>
          </YogaPdfContainer> */}

          {loading || loadingGlobal ? (
            <LoadingState />
          ) : (
            <>
              <InvoicePdfPreview
                data={receiptData}
                emailTemplateSettings={emailTemplateSettings}
                templateSettings={templateSettings}
                qrCode={qrCodeUrl}
              />
              <PdfDownload
                data={receiptData}
                templateSettings={templateSettings}
                emailTemplateSettings={emailTemplateSettings}
                pdfFile={pdfFile}
                setPdfFile={setPdfFile}
                fileName={`receipt-${randomId}.pdf`}
                qrCode={qrCodeUrl}
              />
            </>
          )}
          {renderModal()}
        </>
      )}
    </>
  );
};

export default ReceiptPdfPreview;
