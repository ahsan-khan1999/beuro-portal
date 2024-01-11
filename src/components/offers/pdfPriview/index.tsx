import EmailCard from "./PdfCard";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import LoadingState from "@/base-components/loadingEffect/loading-state";
const OfferPdf = dynamic(
  () => import("@/components/reactPdf/offer-pdf-preview"),
  { ssr: false, loading: () => <LoadingState /> }
);
const OfferPdfDownload = dynamic(() => import("./generate-offer-pdf"), {
  ssr: false,
});

import { useOfferPdf } from "@/hooks/offers/useOfferPdf";
import dynamic from "next/dynamic";

const PdfPriview = () => {
  const {
    offerData,
    activeButtonId,
    emailTemplateSettings,
    templateSettings,
    modal,
    loading,
    loadingGlobal,
    pdfFile,
    setPdfFile,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    systemSetting,
  } = useOfferPdf();

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Email Sent Successfully "
        subHeading="Thanks for updating offer we are happy to have you. "
        route={onSuccess}
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
        <div className="">
          <EmailCard
            emailStatus={offerData?.emailHeader?.emailStatus}
            offerNo={offerData?.emailHeader?.offerNo}
            onEmailSend={handleEmailSend}
            loading={loading}
            onDownload={handleDonwload}
            onPrint={handlePrint}
            handleSendByPost={handleSendByPost}
            activeButtonId={activeButtonId}
          />
          <div className="flex justify-center my-5">
            <OfferPdf
              data={offerData}
              emailTemplateSettings={emailTemplateSettings}
              templateSettings={templateSettings}
              systemSetting={systemSetting}
            />
            <OfferPdfDownload
              data={offerData}
              templateSettings={templateSettings}
              emailTemplateSettings={emailTemplateSettings}
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              systemSetting={systemSetting}
            />
          </div>

          {renderModal()}
        </div>
      )}
    </>
  );
};

export default PdfPriview;
