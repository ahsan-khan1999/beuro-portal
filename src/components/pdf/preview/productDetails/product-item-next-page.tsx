import { PurchasedItemDetailsNextPageProps } from "@/types";
import { ProductItem } from "./product-item";
import { DocumentHeader } from "../document-header";
import { ProductItemFooter } from "./product-item-footer";
import { Footer } from "../../footer";

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
  const disscountTableRow = {
    serviceTitle: "Discount",
    price: Number(serviceItemFooter?.discount),
    unit: "-",
    totalPrice: Number(serviceItemFooter?.discount),
    serviceType: "",
    description: serviceItemFooter?.discountDescription || "",
    count: "-",
    pagebreak: true,
    discount: Number(serviceItemFooter?.discount)
  }
  const isDiscount = serviceItemFooter?.serviceDiscountSum && Number(serviceItemFooter?.serviceDiscountSum) > 0 || false
  return (
    <div>
      <DocumentHeader
        {...headerDetails}
        emailTemplateSettings={emailTemplateSettings}
      />
      <div className="px-[80px] flex flex-col bg-white py-2">
        {serviceItem?.map((item, index) => (
          <ProductItem {...item} key={index} />
        ))}
        <ProductItem {...disscountTableRow} key={Math.random()} pagebreak={true} isDiscount={isDiscount}/>
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
        currPage={currPage}
        totalPages={totalPages}
        emailTemplateSettings={emailTemplateSettings}
      />
    </div>
  );
};
