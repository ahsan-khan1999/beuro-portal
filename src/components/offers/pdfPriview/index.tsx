import EmailCard from "./PdfCard";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";

const OfferPdf = dynamic(
  () => import("@/components/reactPdf/offer-pdf-preview"),
  {
    ssr: false,
    //  loading: () => <CustomLoader />
  }
);
const OfferPdfDownload = dynamic(() => import("./generate-offer-pdf"), {
  ssr: false,
});

import { useOfferPdf } from "@/hooks/offers/useOfferPdf";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const OfferPdfPriview = () => {
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
    offerDetails,
  } = useOfferPdf();

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
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_created_des")}
        route={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      {/* {loading ? (
         <CustomLoader />
      ) : ( */}
      <div>
        <EmailCard
          emailStatus={offerDetails?.emailStatus}
          offerNo={offerData?.emailHeader?.offerNo}
          onEmailSend={handleEmailSend}
          loading={loading}
          onDownload={handleDonwload}
          onPrint={handlePrint}
          handleSendByPost={handleSendByPost}
          activeButtonId={activeButtonId}
          offerId={offerData?.id}
        />

        {loading ? (
          <CustomLoader />
        ) : (
          <div className="mt-5">
            <OfferPdf
              data={offerData}
              emailTemplateSettings={emailTemplateSettings}
              templateSettings={templateSettings}
              systemSetting={systemSetting}
              showContractSign={true}
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
            />
            <OfferPdfDownload
              data={offerData}
              templateSettings={templateSettings}
              emailTemplateSettings={emailTemplateSettings}
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              systemSetting={systemSetting}
              showContractSign={true}
            />
          </div>
        )}

        {renderModal()}
      </div>
      {/* )} */}
    </>
  );
};

export default OfferPdfPriview;
