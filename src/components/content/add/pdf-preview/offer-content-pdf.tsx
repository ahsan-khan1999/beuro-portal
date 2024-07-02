import dynamic from "next/dynamic";
import { useOfferContentPdf } from "@/hooks/content/useOfferContentPdf";

const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  {
    ssr: false,
  }
);

export const OfferContentPdf = ({ description }: { description: string }) => {
  const {
    contentData,
    emailTemplateSettings,
    systemSetting,
    templateSettings,
    currentLanguage,
  } = useOfferContentPdf();

  return (
    // <ContentPdfPage
    //   headerDetails={contentData?.headerDetails}
    //   footerDetails={contentData?.footerDetails}
    //   aggrementDetails={offerDescription}
    //   templateSettings={templateSettings}
    //   totalPages={totalPages}
    //   currPage={currPage}
    //   emailTemplateSettings={emailTemplateSettings}
    //   systemSettings={systemSetting}
    // />

    <ContentPdf
      data={contentData}
      emailTemplateSettings={emailTemplateSettings}
      templateSettings={templateSettings}
      description={description}
      language={currentLanguage}
    />
  );
};
