import { ConfirmationContentPdf } from "../add/pdf-preview/confirmation-content-pdf";
import { InvoiceContentPdf } from "../add/pdf-preview/invoice-content-pdf";
import { OfferContentPdf } from "../add/pdf-preview/offer-content-pdf";
import { ReceiptContentPdf } from "../add/pdf-preview/receipt-content-pdf";

export const ContentPdfPriview = ({
  type,
  description,
}: {
  type: string;
  description: string;
}) => {
  const renderPdfComponent = () => {
    switch (type) {
      case "offer":
        return <OfferContentPdf description={description} />;
      case "confirmation":
        return <ConfirmationContentPdf description={description} />;
      case "invoice":
        return <InvoiceContentPdf description={description} />;
      case "receipt":
        return <ReceiptContentPdf description={description} />;
      default:
        return null;
    }
  };

  return <>{renderPdfComponent()}</>;
};
