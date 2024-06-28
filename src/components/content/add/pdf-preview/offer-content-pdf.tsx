import { Container } from "@/components/pdf/container";
import { ContentPdfPage } from "./pageDetails/content-pdf-page";
import { useOfferContentPdf } from "@/hooks/content/useOfferContentPdf";

export const OfferContentPdf = ({
  offerDescription,
  currPage,
  totalPages,
}: {
  offerDescription: string;
  totalPages?: number;
  currPage?: number;
}) => {
  const {
    contentData,
    emailTemplateSettings,
    systemSetting,
    templateSettings,
  } = useOfferContentPdf();

  return (
    <Container className="h-fit">
      <div className="p-2 rounded-lg">
        <ContentPdfPage
          headerDetails={contentData?.headerDetails}
          footerDetails={contentData?.footerDetails}
          aggrementDetails={offerDescription}
          templateSettings={templateSettings}
          totalPages={totalPages}
          currPage={currPage}
          emailTemplateSettings={emailTemplateSettings}
          systemSettings={systemSetting}
        />
      </div>
    </Container>
  );
};
