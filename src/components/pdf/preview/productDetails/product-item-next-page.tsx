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
  currPage
}: PurchasedItemDetailsNextPageProps) => {
  return (
    <div>
      <DocumentHeader {...headerDetails} />
      <div className="px-[80px] flex flex-col bg-white">
        {serviceItem.map((item,index) => (
          <ProductItem {...item} key={index} />
        ))}
        {isShowTotal && <ProductItemFooter {...serviceItemFooter} />}
      </div>
      <Footer {...footerDetails} columnSettings={templateSettings} currPage={currPage} totalPages={totalPages} />
    </div>
  );
};
