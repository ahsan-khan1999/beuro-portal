import { ProductItemFooterProps } from "@/types/types";
import { calculateTax } from "@/utils/utility";
import { useTranslation } from "next-i18next";

export const ProductItemFooter = ({
  subTotal,
  discount,
  grandTotal,
  tax,
  systemSettings,
  serviceDiscountSum,
  discountType,
  taxType,
  isDiscount,
  isTax
}: Partial<ProductItemFooterProps>) => {

  const calculatedDiscount = discountType && discountType === "Amount" ? discount : calculateTax(Number(discount), Number(subTotal))
  const calculatedTax = taxType && calculateTax(Number(tax), Number(subTotal)) || 0
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mb-[90px] mt-[44px]">
      <div className="flex flex-col gap-y-[10px]">
        <span className="text-sm font-medium text-[#000]">
          {translate("pdf.condition_for_moving")}
        </span>
        <span className="text-[#404040] font-normal text-sm">
          {translate("pdf.thanks_message")}
        </span>
        <span className="text-[#404040] font-normal text-sm max-w-[490px]">
          {translate("pdf.pdf_description")}
        </span>
      </div>

      <div>
        <div className="flex flex-col gap-y-[10px] pr-3 w-full">
          <div className="flex justify-between w-full">
            <span className="text-[#1E1E1E] text-sm font-medium">
              {translate("pdf.sub_total")}:
            </span>
            <span className="text-[#1E1E1E] text-sm font-medium self-end">
              {subTotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#1E1E1E] text-sm font-medium">
              {translate("pdf.tax")}:
            </span>
            <span className="text-[#1E1E1E] text-sm font-medium ">{
              isTax &&
              <>
                {Number(calculatedTax).toFixed(2)}  ({tax}%)
              </> || 0
            } </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-[#1E1E1E] text-sm font-medium">
              {translate("pdf.discount")}:
            </span>
            <span className="text-[#1E1E1E] text-sm font-medium">
            {!isDiscount ? serviceDiscountSum : serviceDiscountSum && (serviceDiscountSum + Number(calculatedDiscount)).toFixed(2) || Number(calculatedDiscount).toFixed(2)}
            </span>
          </div> */}
        </div>
        <div className="flex justify-between items-center bg-[#404F6A] rounded-[4px] px-[10px] py-[8px] gap-[55px] mt-[10px]">
          <span className="text-sm font-semibold text-[#fff]">
            {translate("pdf.grand_total")}:
          </span>
          <span className="text-sm font-semibold text-[#fff]">
            {grandTotal}{" " + systemSettings?.currency}
          </span>
        </div>
      </div>
    </div>
  );
};
