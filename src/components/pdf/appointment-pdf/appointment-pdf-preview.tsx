import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { PdfProps, TemplateType } from "@/types";
import { EmailTemplate } from "@/types/settings";
import React from "react";
import { DocumentHeader } from "../preview/document-header";
import { ContactDetails } from "../preview/contact-details";
import { MovingDetails } from "../preview/movng-details";
import { Footer } from "../footer";
import { ProductItem } from "../preview/productDetails/product-item";
import { ProcutItemHeader } from "../preview/productDetails/product-item-header";
import { ProductItemFooter } from "../preview/productDetails/product-item-footer";
import { ServicesTotalAmount } from "./sevices-total";
import { AddressDetailCard } from "@/components/setting/general-setting/address";
import AddressDetails from "./address-details";
import { ServiceItem } from "./service-item";
import { ServiceHeader } from "./service-header";

export interface AppointProps {
  pdfData?: PdfProps;
  templateSettings: TemplateType | null;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings: SystemSetting | null;
  language?: string | undefined;
}

const AppointmentPdfPreview = <T,>({
  pdfData,
  emailTemplateSettings,
  systemSettings,
  templateSettings,
  language,
}: AppointProps) => {
  const isDiscount =
    pdfData?.serviceItemFooter?.serviceDiscountSum &&
    Number(pdfData?.serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;

  const { address } = pdfData?.movingDetails || {};
  return (
    <div className="mb-5">
      <DocumentHeader
        {...pdfData?.headerDetails}
        emailTemplateSettings={emailTemplateSettings}
      />
      <div className="px-[80px] flex flex-col bg-white">
        <ContactDetails {...{ ...pdfData?.contactAddress, language }} />
        <AddressDetails {...{ address }} />

        <ServiceHeader isDiscount={isDiscount} />
        {pdfData?.serviceItem?.map((item, index) => (
          <ServiceItem
            {...item}
            key={index}
            isDiscount={isDiscount}
            pagebreak={false}
          />
        ))}

        <ServicesTotalAmount
          {...pdfData?.serviceItemFooter}
          systemSettings={systemSettings}
        />
      </div>
      <Footer
        {...pdfData?.footerDetails}
        columnSettings={templateSettings}
        // totalPages={totalPages}
        currPage={undefined}
        emailTemplateSettings={emailTemplateSettings}
      />
    </div>
  );
};

export default AppointmentPdfPreview;
