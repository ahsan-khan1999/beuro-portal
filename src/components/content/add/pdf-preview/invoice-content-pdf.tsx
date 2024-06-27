import { Container } from "@/components/pdf/container";
import { ContentPdfPage } from "./pageDetails/content-pdf-page";
import { useInvoiceContentPdf } from "@/hooks/content/useInvoiceContentPdf";

export const InvoiceContentPdf = ({
  invoiceDescription,
}: {
  invoiceDescription: string;
}) => {
  const {
    contentData,
    contentDetails,
    emailTemplateSettings,
    loading,
    systemSetting,
    templateSettings,
  } = useInvoiceContentPdf();

  return (
    <Container>
      <div className="flex flex-col items-center bg-[#EDF4FF] p-2 rounded-lg">
        <div className="flex flex-col gap-y-[30px]">
          <ContentPdfPage
            headerDetails={contentData?.headerDetails}
            footerDetails={contentData?.footerDetails}
            aggrementDetails={invoiceDescription}
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
