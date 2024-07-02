import { useInvoiceContentPdf } from "@/hooks/content/useInvoiceContentPdf";
import dynamic from "next/dynamic";

const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  {
    ssr: false,
  }
);

export const InvoiceContentPdf = ({ description }: { description: string }) => {
  const {
    contentData,
    emailTemplateSettings,
    templateSettings,
    currentLanguage,
  } = useInvoiceContentPdf();

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
