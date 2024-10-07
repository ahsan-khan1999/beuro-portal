import EmailCard from "./PdfCard";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";

const OfferPdf = dynamic(() => import("@/components/reactPdf/pdf-layout"), {
  ssr: false,
});

import { useOfferPdf } from "@/hooks/offers/useOfferPdf";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { MailSendLoadingGif } from "@/base-components/ui/modals1/MailLoadingGif";

const OfferPdfPriview = () => {
  const {
    offerData,
    activeButtonId,
    modal,
    loading,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    offerDetails,
    isPdfRendering,
    mergedPdfUrl,
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
    [ModalType.LOADING_MAIL_GIF]: <MailSendLoadingGif onClose={onClose} />,
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

          <div className="mt-5">
            <OfferPdf
              mergedPdfFileUrl={mergedPdfUrl}
              isPdfRendering={isPdfRendering}
            />
          </div>
        </>
      )}

      {renderModal()}
    </>
  );
};

export default OfferPdfPriview;
