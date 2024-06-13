const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  {
    ssr: false,
  }
);

import dynamic from "next/dynamic";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useReceiptContentPdf } from "@/hooks/content/useReceiptContentPdf";

export const ReceiptContentPdf = () => {
  const { loading, contentData, templateSettings, emailTemplateSettings } =
    useReceiptContentPdf();

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
