import React, { useEffect, useId, useMemo, useState } from "react";
import EmailCard from "./PdfCard";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import dynamic from "next/dynamic";
import useMergedPdfDownload from "@/components/reactPdf/generate-merged-pdf-download";
import { PdfPreviewProps } from "@/types";
import { useContractPdf } from "@/hooks/contract/useContractPdf";
import { RenderPdf } from "./render-pdf";

const ContractPdfPreview = dynamic(
  () => import("@/components/reactPdf/pdf-layout"),
  { ssr: false }
);
// const ContractPdfPreview = dynamic(
//   () => import("@/components/reactPdf/offer-pdf-preview"),
//   { ssr: false, loading: () => <LoadingState /> }
// );

// const PdfDownload = dynamic(
//   () => import("@/components/reactPdf/generate-merged-pdf-download"),
//   {
//     ssr: false,
//   }
// );

// const PdfDownload = dynamic(() => import("./generate-offer-pdf"), { ssr: false });

const PdfDownload = dynamic(
  () => import("@/components/reactPdf/generate-Pdf-Download"),
  { ssr: false }
);

const PdfPriview = () => {
  const {
    contractData,
    loading,
    modal,
    activeButtonId,
    router,
    templateSettings,
    emailTemplateSettings,
    loadingGlobal,
    pdfFile,
    qrCodeUrl,
    mergedPdfUrl,
    remoteFileBlob,
    setPdfFile,
    dispatch,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    onClose,
    onSuccess,
    systemSetting,
  } = useContractPdf();

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

  const fileName = "`${contractData?.emailHeader?.contractNo}.pdf`";
  const contractDataProps = useMemo(
    () => ({
      emailTemplateSettings,
      templateSettings,
      data: contractData,
      fileName,
      qrCode: qrCodeUrl,
      remoteFileBlob,
      systemSetting,
    }),
    [
      emailTemplateSettings,
      templateSettings,
      contractData,
      fileName,
      qrCodeUrl,
      remoteFileBlob,
      systemSetting,
    ]
  );

  const { mergedFile } = useMergedPdfDownload(contractDataProps);

  useEffect(() => {
    if (mergedFile) setPdfFile(mergedFile);
  }, [mergedFile]);

  return (
    <>
      {loading || loadingGlobal ? (
        <LoadingState />
      ) : (
        <>
          <EmailCard
            contractStatus={contractData?.emailHeader?.emailStatus}
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

          <div className="flex justify-center my-5">
            {/* {mergedPdfUrl ? (
              <iframe
                height="1000"
                src={mergedPdfUrl}
                width="100%"
                style={{ border: "none" }}
              />
            ) : (
              <LoadingState />
            )} */}
            <ContractPdfPreview
              data={contractData}
              emailTemplateSettings={emailTemplateSettings}
              templateSettings={templateSettings}
              systemSetting={systemSetting}
              qrCode={qrCodeUrl}
              remoteFileBlob={remoteFileBlob}
            />
            {/* <PdfDownload
              data={contractData}
              templateSettings={templateSettings}
              emailTemplateSettings={emailTemplateSettings}
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              systemSetting={systemSetting}
              qrCode={qrCodeUrl}
              fileName={`${contractData?.emailHeader?.contractNo}.pdf`}
            /> */}
          </div>
          {/* {mergedPdfUrl && <RenderPdf mergedPdfUrl={mergedPdfUrl} />} */}
          {renderModal()}
        </>
      )}
    </>
  );
};

export default PdfPriview;
