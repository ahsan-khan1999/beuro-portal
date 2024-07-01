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
  );
};
