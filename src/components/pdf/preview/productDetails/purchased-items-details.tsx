import { DocumentHeader } from "../document-header";
import { Footer } from "../../footer";
import { ContactDetails } from "../contact-details";
import { MovingDetails } from "../movng-details";
import { ProductItem } from "./product-item";
import { ProcutItemHeader } from "./product-item-header";
import { ProductItemFooter } from "./product-item-footer";
import { PurchasedItemsDetailsProps } from "@/types/types";
import { useTranslation } from "next-i18next";

export const ProductPurchasedItemsDetails = ({
  contactAddress,
  footerDetails,
  headerDetails,
  movingDetails,
  serviceItem,
  serviceItemFooter,
  isShowTotal,
  templateSettings,
  totalPages,
  isOffer,
  emailTemplateSettings,
  systemSettings,
  handleEditDateModal,
}: Partial<PurchasedItemsDetailsProps>) => {
  const { t: translate } = useTranslation();

  const disscountTableRow = {
    serviceTitle: translate("pdf_preview.discount"),
    price: Number(serviceItemFooter?.discount),
    unit: "-",
    totalPrice: Number(serviceItemFooter?.discount),
    serviceType: "",
    description: serviceItemFooter?.discountDescription || "",
    count: "-",
    pagebreak: true,
    discount: Number(serviceItemFooter?.discount),
    discountType: serviceItemFooter?.discountType,
    updatedDiscountAmount: Number(serviceItemFooter?.updatedDiscountAmount),
    discountPercentage: Number(serviceItemFooter?.discountPercentage),
    totalDiscount: Number(serviceItemFooter?.serviceDiscountSum),
    isGlobalDiscount: serviceItemFooter?.isDiscount,
  };

  const isDiscount =
    serviceItemFooter?.serviceDiscountSum &&
    Number(serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;

  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;

  return (
    <div>
      <DocumentHeader
        {...headerDetails}
        emailTemplateSettings={emailTemplateSettings}
      />
      <div className="px-[80px] flex flex-col bg-white">
        <ContactDetails {...contactAddress} />
        <MovingDetails
          {...movingDetails}
          isOffer={isOffer}
          handleEditDateModal={handleEditDateModal}
        />
        <ProcutItemHeader isDiscount={isDiscount} />
        {serviceItem?.map((item, index) => (
          <ProductItem
            {...item}
            key={index}
            isDiscount={isDiscount}
            pagebreak={
              !pageBreakCondition
                ? serviceItem?.length === 1
                  ? false
                  : index === serviceItem?.length - 1
                : false
            }
          />
        ))}
        {/* {(isDiscount || serviceItemFooter?.isDiscount) && (
          <ProductDiscountItem
            {...disscountTableRow}
            key={Math.random()}
            pagebreak={true}
            isDiscount={isDiscount}
          />
        )} */}

        {isShowTotal && (
          <ProductItemFooter
            {...serviceItemFooter}
            systemSettings={systemSettings}
          />
        )}
      </div>
      <Footer
        {...footerDetails}
        columnSettings={templateSettings}
        totalPages={totalPages}
        currPage={1}
        emailTemplateSettings={emailTemplateSettings}
      />
    </div>
  );
};
