const ReportPDF = dynamic(
  () => import("@/components/reportPdf/generate-report-pdf"),
  {
    ssr: false,
  }
);

import dynamic from "next/dynamic";

export const ReportPdfPreview = () => {
  return <ReportPDF />;
};
