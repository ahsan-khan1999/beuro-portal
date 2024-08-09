import { useReceiptContentPdf } from "@/hooks/content/useReceiptContentPdf";
import dynamic from "next/dynamic";

const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  { ssr: false }
);

export const ReceiptContentPdf = ({ description }: { description: string }) => {
  const {
    contentData,
    emailTemplateSettings,
    templateSettings,
    currentLanguage,
  } = useReceiptContentPdf();

  return (
    <ContentPdf
      data={contentData}
      emailTemplateSettings={emailTemplateSettings}
      templateSettings={templateSettings}
      description={description}
      language={currentLanguage}
      isOfferPdf={false}
    />
  );
};
