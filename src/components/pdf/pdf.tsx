import { ProductPurchasedItemsDetails } from "./preview/productDetails/purchased-items-details";
import { Aggrement } from "./preview/aggrement/aggrement";
import {
  PdfProps,
  TemplateType,
} from "@/types/types";
import { PaymentQRCodeDetails } from "./preview/qrCode/payment-qr-code-details";
import { ProductItemNewPage } from "./preview/productDetails/product-item-next-page";
import { Container } from "./container";
import { ServiceList } from "@/types/offers";
import { PreviewCard } from "./preview-card";

export const Pdf = ({
  newPageData,
  offerData,
  templateSettings,
  isQr,
  totalPages
}: {
  offerData: PdfProps;
  newPageData: ServiceList[][];
  templateSettings: TemplateType | null;
  isQr?: boolean;
  totalPages: number;
}) => {
  return (
    <Container>
      {/* <PreviewCard /> */}
      <div className="flex flex-col gap-y-[30px]">
        {newPageData.length > 0 && (
          <ProductPurchasedItemsDetails
            {...offerData}
            serviceItem={newPageData[0]}
            isShowTotal={newPageData.length === 1}
            templateSettings={templateSettings}
            totalPages={totalPages}
          />
        )}
        {newPageData.slice(1).map((pageItems, index) => (
          <ProductItemNewPage
            key={index}
            serviceItem={pageItems}
            footerDetails={offerData.footerDetails}
            headerDetails={offerData.headerDetails}
            serviceItemFooter={offerData.serviceItemFooter}
            isShowTotal={index === newPageData.length - 2}
            templateSettings={templateSettings}
            totalPages={totalPages}
            currPage={index + 2}
          />
        ))}
        <Aggrement
          contactAddress={offerData.contactAddress}
          headerDetails={offerData.headerDetails}
          footerDetails={offerData.footerDetails}
          aggrementDetails={offerData.aggrementDetails}
          templateSettings={templateSettings}
          totalPages={totalPages}
          currPage={totalPages}
        />
        {isQr && <PaymentQRCodeDetails
          contactAddress={offerData.contactAddress}
          headerDetails={offerData.headerDetails}
          qrCode={offerData.qrCode}
        />}
      </div>

      {/* <button className="mt-[55px] w-full bg-[#45C769] rounded-[4px] shadow-md py-[10px] text-center text-white">
        Accepted
      </button> */}
    </Container>
  );
};
