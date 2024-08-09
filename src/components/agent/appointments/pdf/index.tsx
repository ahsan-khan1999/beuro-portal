const ReportPDF = dynamic(() => import("@/components/reactPdf/pdf-layout"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { AppointmentPdfCard } from "./pdf-card";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useReportUpdatedPdf } from "@/hooks/appointments/useReportUpdatedPdf";

export const ReportPdfPreview = () => {
  const {
    reportData,
    isLoading,
    handleDonwload,
    handlePrint,
    reportDetails,
    isPdfRendering,
    mergedPdfUrl,
  } = useReportUpdatedPdf();

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
