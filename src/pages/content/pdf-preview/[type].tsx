import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { OfferContentPdf } from "@/components/content/add/pdf-preview/offer-content-pdf";
import { ConfirmationContentPdf } from "@/components/content/add/pdf-preview/confirmation-content-pdf";
import { InvoiceContentPdf } from "@/components/content/add/pdf-preview/invoice-content-pdf";
import { ReceiptContentPdf } from "@/components/content/add/pdf-preview/receipt-content-pdf";

const index = () => {
  const router = useRouter();
  const { type } = router.query;
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!type) return;

    const storedDescription = localStorage.getItem("description");
    if (storedDescription) {
      setDescription(storedDescription);
    }

    return () => {
      localStorage.removeItem("description");
    };
  }, [type]);

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

  return <div>{renderPdfComponent()}</div>;
};

export default index;
