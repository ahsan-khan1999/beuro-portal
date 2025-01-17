import EmailCard from "./PdfCard";
import { ModalConfigType, ModalType } from "@/enums/ui";
import dynamic from "next/dynamic";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useContractPdf } from "@/hooks/contract/useContractPdf";
import { useTranslation } from "next-i18next";
import { Layout } from "@/layout";
import { MailSendLoadingGif } from "@/base-components/ui/modals1/MailLoadingGif";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const ContractPdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  { ssr: false }
);

const PdfPriview = () => {
  const {
    contractData,
    loading,
    modal,
    activeButtonId,
    router,
    mergedPdfUrl,
    isPdfRendering,
    dispatch,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    contractDetails,
  } = useContractPdf();

  const { t: translate } = useTranslation();

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.updating_contract")}
        route={onSuccess}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.update_contract_heading")}
        subHeading={translate("common.modals.updating_contract")}
        route={() => {
          dispatch(updateModalType({ type: ModalType.NONE }));
          router.back();
        }}
      />
    ),
    [ModalType.LOADING_MAIL_GIF]: <MailSendLoadingGif onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const isCalendar = router.query.isCalendar;
  if (!router.isReady) {
    return null;
  }

  return (
    <>
      {isCalendar ? (
        <ContractPdfPreview
          mergedPdfFileUrl={mergedPdfUrl}
          isPdfRendering={isPdfRendering}
        />
      ) : (
        <Layout>
          {loading ? (
            <CustomLoader />
          ) : (
            <>
              <EmailCard
                contractStatus={contractDetails?.emailStatus}
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

              <div className="mt-5">
                <ContractPdfPreview
                  mergedPdfFileUrl={mergedPdfUrl}
                  isPdfRendering={isPdfRendering}
                />
              </div>
            </>
          )}

          {renderModal()}
        </Layout>
      )}
    </>
  );
};

export default PdfPriview;
