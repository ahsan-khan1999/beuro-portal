import { Container } from "@/components/pdf/container";
import { PdfFirstPage } from "./pageDetails/pdf-first-page";
import { useOfferContentPdf } from "@/hooks/content/useOfferContentPdf";

export const ContentPdfPreview = () => {
  const {
    contentData,
    contentDetails,
    emailTemplateSettings,
    loading,
    systemSetting,
    templateSettings,
  } = useOfferContentPdf();

  return (
    <div className="bg-white rounded-lg">
      <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-3 pb-2">
        PDF Preview
      </h1>

      <Container>
        <div className="flex flex-col items-center bg-[#EDF4FF] p-2 rounded-lg">
          <div className="flex flex-col gap-y-[30px]">
            <PdfFirstPage
              pdfData={contentData}
              emailTemplateSettings={emailTemplateSettings}
              templateSettings={templateSettings}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
