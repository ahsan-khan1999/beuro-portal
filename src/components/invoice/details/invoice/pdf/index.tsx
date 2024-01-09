import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { InvoiceEmailHeader } from "./invoice-email-header";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { useInvoicePdf } from "@/hooks/invoice/useInvoicePdf";
import dynamic from "next/dynamic";

const InvoicePdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  { ssr: false }
);
const PdfDownload = dynamic(
  () => import("@/components/reactPdf/generate-Pdf-Download"),
  {
    ssr: false,
  }
);

const DetailsPdfPriview = () => {
  const {
    activeButtonId,
    invoiceData,
    emailTemplateSettings,
    pdfFile,
    router,
    templateSettings,
    modal,
    loadingGlobal,
    loading,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    dispatch,
    onClose,
    onSuccess,
    setPdfFile,
    translate,
    systemSetting
  } = useInvoicePdf();

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
        heading={translate("common.modals.offer_email_sent")}
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
            {...invoiceData?.emailHeader}
            contentName={invoiceData?.emailHeader.contentName}
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
                  pdfData={invoiceData}
                  newPageData={newPageData}
                  templateSettings={templateSettings}
                  totalPages={calculateTotalPages}
                  isQr={true}
                  emailTemplateSettings={emailTemplateSettings}

                />
              </div>
            </YogaPdfContainer> */}

          <div className="flex justify-center my-5">
            <InvoicePdfPreview
              data={invoiceData}
              emailTemplateSettings={emailTemplateSettings}
              templateSettings={templateSettings}
              systemSetting={systemSetting}
            />
            <PdfDownload
              data={invoiceData}
              templateSettings={templateSettings}
              emailTemplateSettings={emailTemplateSettings}
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              fileName="invoice.pdf"
              systemSetting={systemSetting}
            />
          </div>

          {renderModal()}
        </>
      )}
    </>
  );
};

export default DetailsPdfPriview;
