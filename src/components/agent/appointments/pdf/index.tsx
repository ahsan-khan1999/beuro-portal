const ReportPDF = dynamic(() => import("@/components/reactPdf/pdf-layout"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { AppointmentPdfCard } from "./pdf-card";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useReportUpdatedPdf } from "@/hooks/appointments/useReportUpdatedPdf";
import AppointmentPdfPreview from "@/components/pdf/appointment-pdf/appointment-pdf-preview";
import { Container } from "@/components/pdf/container";
import { useAppSelector } from "@/hooks/useRedux";

export const ReportPdfPreview = () => {
  const {
    isLoading,
    handleDonwload,
    handlePrint,
    reportDetails,
    isPdfRendering,
    mergedPdfUrl,
    emailTemplateSettings,
    reportData,
    templateSettings,
    systemSetting,
    loading,
  } = useReportUpdatedPdf();

  const { currentLanguage } = useAppSelector((state) => state.global);

  return (
    <div className="flex flex-col gap-y-5 pb-5">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <AppointmentPdfCard
            appointmentDetails={reportDetails}
            onDownload={handleDonwload}
            onPrint={handlePrint}
          />

          {/* <ReportPDF
            mergedPdfFileUrl={mergedPdfUrl}
            isPdfRendering={isPdfRendering}
          /> */}
          {reportData && (
            <Container>
              <AppointmentPdfPreview
                pdfData={reportData}
                templateSettings={templateSettings}
                emailTemplateSettings={emailTemplateSettings}
                systemSettings={systemSetting}
                language={currentLanguage}
              />
            </Container>
          )}
        </>
      )}
    </div>
  );
};
