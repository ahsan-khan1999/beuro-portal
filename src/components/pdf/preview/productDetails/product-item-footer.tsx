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
  isTax,
}: Partial<ProductItemFooterProps>) => {
  const { t: translate } = useTranslation();

  const calculatedDiscount =
    discountType && discountType === "Amount"
      ? discount
      : calculateTax(Number(discount), Number(subTotal));

  const calculatedTax =
    (taxType &&
      calculateTax(
        Number(tax),
        Number(Number(subTotal) - Number(isDiscount ? calculatedDiscount : 0))
      )) ||
    0;

  const discountAmount = (Number(discount) / 100) * Number(subTotal);

  const totalAfterDiscount =
    discountType && discountType === "Amount"
      ? Number(subTotal) - Number(discount)
      : Number(subTotal) - Number(discountAmount);

  const discountValue =
    discountType && discountType === "Amount" ? discount : discountAmount;

  return (
    <div className="flex flex-col mb-[90px] mt-[44px]">
      <div>
        <div className="flex flex-col gap-y-[10px] w-full">
          <div className="flex justify-between w-full border-b border-b-[#ccc] pb-2">
            <span className="text-[#1E1E1E] text-sm font-medium">
              {translate("pdf.sub_total")}:
            </span>
            <span className="text-[#1E1E1E] text-sm font-medium self-end">
              {subTotal}
              {" " + systemSettings?.currency}
            </span>
          </div>
          {isDiscount && (
            <div className="flex justify-between w-full border-b border-b-[#ccc] pb-2">
              <span className="text-[#1E1E1E] text-sm font-medium">
                {translate("pdf.discount")}:
              </span>
              <span className="text-[#1E1E1E] text-sm font-medium self-end">
                {Number(discountValue).toFixed(2)}
                {systemSettings?.currency}{" "}
                {discountType && discountType === "Percent" && `(${discount}%)`}
              </span>
            </div>
          )}
          {isDiscount && (
            <div className="flex justify-between w-full border-b border-b-[#ccc] pb-2">
              <span className="text-[#1E1E1E] text-sm font-medium">
                {translate("pdf.total_after_discount")}:
              </span>
              <span className="text-[#1E1E1E] text-sm font-medium self-end">
                {Number(totalAfterDiscount).toFixed(2)}
                {" " + systemSettings?.currency}
              </span>
            </div>
          )}
          <div className="flex justify-between w-full border-b border-b-[#ccc] pb-2">
            <span className="text-[#1E1E1E] text-sm font-medium">
              Mwst ({tax}%):
            </span>
            <span className="text-[#1E1E1E] text-sm font-medium">
              {(isTax && (
                <>
                  {Number(calculatedTax).toFixed(2)} {systemSettings?.currency}
                </>
              )) ||
                0}{" "}
            </span>
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
        <div className="flex justify-between w-full p-2 bg-[#404F6A] rounded-[4px]">
          <span className="text-sm font-bold text-[#fff]">
            {translate("pdf.grand_total")}:
          </span>
          <span className="text-sm font-bold text-[#fff]">
            {grandTotal}
            {" " + systemSettings?.currency}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-1 mt-[49px]">
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
    </div>
  );
};
