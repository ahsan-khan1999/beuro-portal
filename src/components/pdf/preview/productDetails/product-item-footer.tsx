import { ProductItemFooterProps } from "@/types/types";
import { useTranslation } from "next-i18next";

export const ProductItemFooter = ({
  subTotal,
  discount,
  grandTotal,
  tax,
}: ProductItemFooterProps) => {
  const { t: translation } = useTranslation();
  return (
    <div className="flex justify-between items-center mb-[90px] mt-[44px]">
      <div className="flex flex-col">
        <span className="text-base font-medium text-[#000]">
          Conditions for moving estimates
        </span>

        <span className="text-[#404040] font-normal mt-[10px]">
          Thank you for your interest in our services. <br />
          Below you will find further information regarding the guidelines{" "}
          <br /> and conditions. Please take the time to understand the
          following
          <br /> terms and conditions below.
        </span>
      </div>

      <div>
        <div className="flex flex-col gap-y-[10px] pr-3 w-full">
          <div className="flex justify-between w-full">
            <span className="text-[#1E1E1E] text-base font-medium">
              {translation("pdf.sub_total")}:
            </span>
            <span className="text-[#1E1E1E] text-base font-medium self-end">
              {subTotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#1E1E1E] text-base font-medium">
              {translation("pdf.tax")}:
            </span>
            <span className="text-[#1E1E1E] text-base font-medium ">{tax}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#1E1E1E] text-base font-medium">
              {translation("pdf.discount")}:
            </span>
            <span className="text-[#1E1E1E] text-base font-medium">
              {discount}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center bg-[#404F6A] rounded-[4px] px-[10px] py-[8px] gap-[55px] mt-[10px]">
          <span className="text-base font-semibold text-[#fff]">
            {translation("pdf.grand_total")}:
          </span>
          <span className="text-base font-semibold text-[#fff]">
            {grandTotal}
          </span>
        </div>
      </div>
    </div>
  );
};
