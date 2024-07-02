import { useConfirmationContentPdf } from "@/hooks/content/useConfirmationContentPdf";
import dynamic from "next/dynamic";

const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  {
    ssr: false,
  }
);

export const ConfirmationContentPdf = ({
  description,
}: {
  description: string;
}) => {
  const {
    contentData,
    emailTemplateSettings,
    templateSettings,
    currentLanguage,
  } = useConfirmationContentPdf();

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
