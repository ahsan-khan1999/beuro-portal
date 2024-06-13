const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  {
    ssr: false,
  }
);

import dynamic from "next/dynamic";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useInvoiceContentPdf } from "@/hooks/content/useInvoiceContentPdf";

export const InvoiceContentPdf = () => {
  const { loading, contentData, templateSettings, emailTemplateSettings } =
    useInvoiceContentPdf();

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="mt-5">
          <ContentPdf
            data={contentData}
            emailTemplateSettings={emailTemplateSettings}
            templateSettings={templateSettings}
          />
        </div>
      )}
    </>
  );
};
