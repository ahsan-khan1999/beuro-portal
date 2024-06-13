import { useRouter } from "next/router";
import { ContentPDFComponents } from "@/enums/content";
import { OfferContentPdf } from "./offer-content-pdf";
import { ConfirmationContentPdf } from "./confirmation-content-pdf";
import { InvoiceContentPdf } from "./invoice-content-pdf";
import { ReceiptContentPdf } from "./receipt-content-pdf";
import useContentDetail from "@/hooks/content/useContentDetail";
import { PdfContentCard } from "./pdf-content-card";

export const ContentPdfPriview = () => {
  const { contentDetails, contentDeleteHandler } = useContentDetail();

  const router = useRouter();
  const pdfType = router.query?.contentPdfType as ContentPDFComponents;

  const lookUp = {
    [ContentPDFComponents.OFFER_CONTENT_PDF]: <OfferContentPdf />,
    [ContentPDFComponents.CONFIRMATION_CONTENT_PDF]: <ConfirmationContentPdf />,
    [ContentPDFComponents.INVOICE_CONTENT_PDF]: <InvoiceContentPdf />,
    [ContentPDFComponents.RECEIPT_CONTENT_PDF]: <ReceiptContentPdf />,
  };

  return (
    <>
      <div className="bg-white rounded-md px-5 pt-5 pb-10">
        <PdfContentCard
          contentDetails={contentDetails}
          contentDeleteHandler={contentDeleteHandler}
        />
      </div>
      {lookUp[pdfType]}
    </>
  );
};
