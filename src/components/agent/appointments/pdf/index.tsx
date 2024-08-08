const ReportPDF = dynamic(() => import("@/components/reactPdf/pdf-layout"), {
  ssr: false,
});

import { useReportPdf } from "@/hooks/appointments/useReportPdf";
import dynamic from "next/dynamic";
import { AppointmentPdfCard } from "./pdf-card";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

export const ReportPdfPreview = () => {
  const {
    currentLanguage,
    isLoading,
    reportData,
    handleDonwload,
    handlePrint,
    isPdfRendering,
    mergedFile,
    mergedPdfUrl,
    pdfFile,
    setPdfFile,
    reportDetails,
  } = useReportPdf();

  return (
    <div className="flex flex-col gap-y-5">
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <AppointmentPdfCard
            appointmentDetails={reportDetails}
            onDownload={handleDonwload}
            onPrint={handlePrint}
          />

          <ReportPDF
            mergedPdfFileUrl={mergedPdfUrl}
            isPdfRendering={isPdfRendering}
          />
        </>
      )}
    </div>
  );
};
