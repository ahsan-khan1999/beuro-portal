import { Container } from "@/components/pdf/container";
import { ContentPdfPage } from "./pageDetails/content-pdf-page";
import { useConfirmationContentPdf } from "@/hooks/content/useConfirmationContentPdf";

export const ConfirmationContentPdf = ({
  confirmationDescription,
}: {
  confirmationDescription: string;
}) => {
  const {
    contentData,
    contentDetails,
    emailTemplateSettings,
    loading,
    systemSetting,
    templateSettings,
  } = useConfirmationContentPdf();

  return (
    <Container>
      <div className="flex flex-col items-center bg-[#EDF4FF] p-2 rounded-lg">
        <div className="flex flex-col gap-y-[30px]">
          <ContentPdfPage
            headerDetails={contentData?.headerDetails}
            footerDetails={contentData?.footerDetails}
            aggrementDetails={confirmationDescription}
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
