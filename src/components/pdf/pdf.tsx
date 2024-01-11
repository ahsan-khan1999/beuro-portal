import { ProductPurchasedItemsDetails } from "./preview/productDetails/purchased-items-details";
import { Aggrement } from "./preview/aggrement/aggrement";
import { InvoiceEmailHeaderProps, PdfProps, TemplateType } from "@/types/types";
import { PaymentQRCodeDetails } from "./preview/qrCode/payment-qr-code-details";
import { ProductItemNewPage } from "./preview/productDetails/product-item-next-page";
import { Container } from "./container";
import { ServiceList } from "@/types/offers";
import { PreviewCard } from "./preview-card";
import { EmailTemplate } from "@/types/settings";

export const Pdf = <T,>({
  newPageData,
  pdfData,
  templateSettings,
  isQr,
  totalPages,
  emailTemplateSettings,
}: {
  pdfData: PdfProps<T>;
  newPageData: ServiceList[][];
  templateSettings: TemplateType | null;
  isQr?: boolean;
  totalPages: number;
  emailTemplateSettings: EmailTemplate | null;
}) => {
  return (
    <Container>
      {/* <PreviewCard /> */}
      <div className="flex flex-col gap-y-[30px]">
        {newPageData.length > 0 && (
          <ProductPurchasedItemsDetails
            {...pdfData}
            serviceItem={newPageData[0]}
            isShowTotal={newPageData.length === 1}
            templateSettings={templateSettings}
            totalPages={totalPages}
            isOffer={pdfData.isOffer}
            emailTemplateSettings={emailTemplateSettings}
          />
        )}
        {newPageData.slice(1).map((pageItems, index) => (
          <ProductItemNewPage
            key={index}
            serviceItem={pageItems}
            footerDetails={pdfData.footerDetails}
            headerDetails={pdfData.headerDetails}
            serviceItemFooter={pdfData.serviceItemFooter}
            isShowTotal={index === newPageData.length - 2}
            templateSettings={templateSettings}
            totalPages={totalPages}
            currPage={index + 2}
            emailTemplateSettings={emailTemplateSettings}
          />
        ))}
        <Aggrement
          contactAddress={pdfData?.contactAddress}
          headerDetails={pdfData?.headerDetails}
          footerDetails={pdfData?.footerDetails}
          aggrementDetails={pdfData?.aggrementDetails}
          templateSettings={templateSettings}
          totalPages={totalPages}
          currPage={totalPages}
          isOffer={pdfData.isOffer}
          handleDescriptionUpdate={
            pdfData.movingDetails?.handleDescriptionUpdate
          }
          signature={pdfData?.signature}
          isCanvas={pdfData?.isCanvas}
          emailTemplateSettings={emailTemplateSettings}
        />
        {isQr && (
          <PaymentQRCodeDetails
            contactAddress={pdfData.contactAddress}
            headerDetails={pdfData.headerDetails}
            qrCode={pdfData.qrCode}
          />
        )}
      </div>

      {/* <button className="mt-[55px] w-full bg-[#45C769] rounded-[4px] shadow-md py-[10px] text-center text-white">
        Accepted
      </button> */}
    </Container>
  );
};
