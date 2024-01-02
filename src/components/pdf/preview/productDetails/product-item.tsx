import { ServiceList } from "@/types/offers";
import { ProductItemProps } from "@/types/types";

export const ProductItem = ({
  count,
  description,
  price,
  serviceTitle,
  totalPrice,
}: ServiceList) => (
  <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] p-[12px] mb-3">
    <div className="grid grid-cols-3 items-center">
      <div className="col-span-2 flex flex-col gap-[4px] max-w-[466px]">
        <span className="text-base font-normal text-[#000]">
          {serviceTitle}
        </span>
        <span className="text-[#404040] text-[14px] font-normal break-all">
          {description}
        </span>
      </div>
      <div className=" col-span-1 flex justify-between items-center">
        <span className="text-base font-normal text-[#000]">{price} CHF</span>
        <span className="text-base font-normal text-[#000]">Std.</span>
        <span className="text-base font-normal text-[#000]">{count}</span>
        <span className="text-base font-semibold text-[#000]">
          {totalPrice} CHF
        </span>
      </div>
    </div>
  </div>
);
