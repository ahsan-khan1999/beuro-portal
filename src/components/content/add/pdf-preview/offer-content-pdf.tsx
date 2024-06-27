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
    contentDetails,
    emailTemplateSettings,
    loading,
    systemSetting,
    templateSettings,
  } = useOfferContentPdf();

  return (
    <Container>
      <div className="flex flex-col items-center bg-[#EDF4FF] p-2 rounded-lg">
        <div className="flex flex-col">
          <ContentPdfPage
            headerDetails={contentData?.headerDetails}
            footerDetails={contentData?.footerDetails}
            aggrementDetails={offerDescription}
            templateSettings={templateSettings}
            totalPages={1}
            currPage={1}
            emailTemplateSettings={emailTemplateSettings}
            systemSettings={systemSetting}
          />
        </div>
      </div>
    </Container>
  );
};
