import { Container } from "@/components/pdf/container";
import { ContentPdfPage } from "./pageDetails/content-pdf-page";
import { useReceiptContentPdf } from "@/hooks/content/useReceiptContentPdf";

export const ReceiptContentPdf = ({
  receiptDescription,
}: {
  receiptDescription: string;
}) => {
  const {
    contentData,
    contentDetails,
    emailTemplateSettings,
    loading,
    systemSetting,
    templateSettings,
  } = useReceiptContentPdf();

  return (
    <Container>
      <div className="flex flex-col items-center bg-[#EDF4FF] p-2 rounded-lg">
        <div className="flex flex-col gap-y-[30px]">
          <ContentPdfPage
            headerDetails={contentData?.headerDetails}
            footerDetails={contentData?.footerDetails}
            aggrementDetails={receiptDescription}
            templateSettings={templateSettings}
            totalPages={contentData?.footerDetails?.totalPages}
            currPage={contentData?.footerDetails?.currPage}
            emailTemplateSettings={emailTemplateSettings}
            systemSettings={systemSetting}
          />
        </div>
      </div>
    </Container>
  );
};
