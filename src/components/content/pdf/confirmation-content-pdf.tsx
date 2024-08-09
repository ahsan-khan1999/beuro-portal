const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  {
    ssr: false,
  }
);

import dynamic from "next/dynamic";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useConfirmationContentPdf } from "@/hooks/content/useConfirmationContentPdf";

export const ConfirmationContentPdf = () => {
  const { loading, contentData, templateSettings, emailTemplateSettings } =
    useConfirmationContentPdf();

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
