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
}: PurchasedItemDetailsNextPageProps) => {
  return (
    <div>
      <DocumentHeader {...headerDetails} />
      <div className="px-[80px] flex flex-col bg-white">
        {serviceItem.map((item) => (
          <ProductItem {...item} key={item.title} />
        ))}
        {isShowTotal && <ProductItemFooter {...serviceItemFooter} />}
      </div>
      <Footer {...footerDetails} />
    </div>
  );
};
