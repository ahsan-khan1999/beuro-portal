import { PurchasedItemDetailsNextPageProps } from "@/types";
import { ProductItem } from "./product-item";
import { DocumentHeader } from "../document-header";
import { ProductItemFooter } from "./product-item-footer";
import { Footer } from "../../footer";
import { useTranslation } from "next-i18next";

export const ProductItemNewPage = ({
  serviceItem,
  footerDetails,
  headerDetails,
  serviceItemFooter,
  isShowTotal,
  templateSettings,
  totalPages,
  currPage,
  emailTemplateSettings,
  systemSettings,
}: Partial<PurchasedItemDetailsNextPageProps>) => {
  const { t: translate } = useTranslation();

  // const disscountTableRow = {
  //   serviceTitle: translate("pdf_preview.discount"),
  //   price: Number(serviceItemFooter?.discount),
  //   unit: "-",
  //   totalPrice: Number(serviceItemFooter?.discount),
  //   serviceType: "",
  //   description: serviceItemFooter?.discountDescription || "",
  //   count: "-",
  //   pagebreak: true,
  //   discount: Number(serviceItemFooter?.discount),
  //   discountType: serviceItemFooter?.discountType,
  //   discountPercentage: Number(serviceItemFooter?.discountPercentage),
  //   updatedDiscountAmount: Number(serviceItemFooter?.updatedDiscountAmount),
  //   totalDiscount: Number(serviceItemFooter?.serviceDiscountSum),
  //   isGlobalDiscount: serviceItemFooter?.isDiscount,
  // };

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
      <div className="px-[80px] flex flex-col bg-white py-2">
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
            isBreakPage={pageBreakCondition}
            systemSettings={systemSettings}
          />
        )}
      </div>
      <Footer
        {...footerDetails}
        columnSettings={templateSettings}
        currPage={currPage}
        totalPages={totalPages}
        emailTemplateSettings={emailTemplateSettings}
      />
    </div>
  );
};
