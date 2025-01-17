import dynamic from "next/dynamic";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { InvoiceEmailHeader } from "./email-header-card";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useMainInvoicePdf } from "@/hooks/invoice/useMainInvoicePdf";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const InvoicePdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  {
    ssr: false,
  }
);

export const MainInvoicePdfDetail = () => {
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
    invoiceDetails,
  } = useMainInvoicePdf();

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
            {...invoiceData?.emailHeader}
            contractStatus={invoiceDetails?.emailStatus}
            contentName={
              invoiceData?.emailHeader && invoiceData?.emailHeader.contentName
            }
            onEmailSend={handleEmailSend}
            loading={loading}
            onDownload={handleDonwload}
            onPrint={handlePrint}
            onSendViaPost={handleSendByPost}
            activeButtonId={activeButtonId}
            title={translate("invoice.invoice_details")}
          />

          <div className="mt-5">
            <InvoicePdfPreview
              mergedPdfFileUrl={mergedPdfUrl}
              isPdfRendering={isPdfRendering}
            />
          </div>

          {renderModal()}
        </>
      )}
    </>
  );
};
