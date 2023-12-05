import { DocumentHeader } from "../document-header";
import { Footer } from "../../footer";
import { ContactDetails } from "../contact-details";
import { MovingDetails } from "../movng-details";
import { ProductItem } from "./product-item";
import { ProcutItemHeader } from "./product-item-header";
import { ProductItemFooter } from "./product-item-footer";
import { PurchasedItemsDetailsProps } from "@/types/types";

export const ProductPurchasedItemsDetails = ({
  contactAddress,
  footerDetails,
  headerDetails,
  movingDetails,
  serviceItem,
  serviceItemFooter,
  isShowTotal,
}: PurchasedItemsDetailsProps) => {
  return (
    <div>
      <DocumentHeader {...headerDetails} />
      <div className="px-[80px] flex flex-col bg-white">
        <ContactDetails {...contactAddress} />
        <MovingDetails {...movingDetails} />
        <ProcutItemHeader />
        {serviceItem.map((item) => (
          <ProductItem {...item} key={item.title} />
        ))}

        {isShowTotal && <ProductItemFooter {...serviceItemFooter} />}
      </div>
      <Footer {...footerDetails} />
    </div>
  );
};
