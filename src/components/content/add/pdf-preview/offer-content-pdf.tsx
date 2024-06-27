import { Container } from "@/components/pdf/container";
import { ContentPdfPage } from "./pageDetails/content-pdf-page";
import { useOfferContentPdf } from "@/hooks/content/useOfferContentPdf";

export const OfferContentPdf = ({
  offerDescription,
}: {
  offerDescription: string;
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
          totalPages={contentData?.footerDetails?.totalPages}
          currPage={contentData?.footerDetails?.currPage}
          emailTemplateSettings={emailTemplateSettings}
          systemSettings={systemSetting}
        />
      </div>
    </Container>
  );
};
