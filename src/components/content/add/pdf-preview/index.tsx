import { useState } from "react";
import { ComponentsType } from "@/enums/content";
import { OfferContentPdf } from "./offer-content-pdf";
import { ConfirmationContentPdf } from "./confirmation-content-pdf";
import { InvoiceContentPdf } from "./invoice-content-pdf";
import { ReceiptContentPdf } from "./receipt-content-pdf";
import { useAppSelector } from "@/hooks/useRedux";

export const ContentPdfPreview = ({
  offerDescription,
}: {
  offerDescription: string;
}) => {
  const { contentDetails } = useAppSelector((state) => state.content);
  const [tabType, setTabType] = useState<number>(
    (contentDetails?.id && contentDetails?.stage) || ComponentsType.addOffer
  );

  // const componentsLookUp = {
  //   [ComponentsType.addOffer]: (
  //     <OfferContentPdf offerDescription={offerDescription} />
  //   ),
  //   [ComponentsType.addConfirmationContent]: <ConfirmationContentPdf />,
  //   [ComponentsType.addInvoiceContent]: <InvoiceContentPdf />,
  //   [ComponentsType.addReceiptContent]: <ReceiptContentPdf />,
  // };

  return (
    <div className="bg-white rounded-lg">
      <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-3 pb-2">
        {translate("common.PDF_PREVIEW")}
      </h1>

      {/* {componentsLookUp[tabType as keyof typeof componentsLookUp]} */}
    </div>
  );
};
