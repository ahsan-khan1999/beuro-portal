import React, { useEffect, useState } from "react";
import { PreviewCard } from "./preview-card";
import { ProductPurchasedItemsDetails } from "./preview/productDetails/purchased-items-details";
import { Aggrement } from "./preview/aggrement/aggrement";
import {
  PdfProps,
  AcknowledgementSlipProps,
  PayableToProps,
  ProductItemProps,
} from "@/types/types";
import { PaymentQRCodeDetails } from "./preview/qrCode/payment-qr-code-details";
import { YogaPdfContainer } from "./yoga-pdf-container";
import { ProductItemNewPage } from "./preview/productDetails/product-item-next-page";
import { Container } from "./container";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readOfferDetails } from "@/api/slices/offer/offerSlice";
import { useRouter } from "next/router";
import { OffersTableRowTypes, ServiceList } from "@/types/offers";

export const Pdf = ({
  newPageData,
  offerData,
}: {
  offerData: PdfProps;
  newPageData: ServiceList[][];
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
          />
        ))}
        <Aggrement
          contactAddress={offerData.contactAddress}
          headerDetails={offerData.headerDetails}
          footerDetails={offerData.footerDetails}
          aggrementDetails={offerData.aggrementDetails}
        />
        <PaymentQRCodeDetails
          contactAddress={offerData.contactAddress}
          headerDetails={offerData.headerDetails}
          qrCode={offerData.qrCode}
        />
      </div>

      <button className="mt-[55px] w-full bg-[#45C769] rounded-[4px] shadow-md py-[10px] text-center text-white">
        Accepted
      </button>
    </Container>
  );
};
