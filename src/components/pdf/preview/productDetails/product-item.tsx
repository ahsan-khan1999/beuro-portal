import { ProductItemProps } from "@/types/types";

export const ProductItem = ({
  count,
  description,
  price,
  title,
  total,
}: ProductItemProps) => (
  <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] p-[12px] mb-3">
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-[4px] max-w-[466px]">
        <span className="text-base font-normal text-[#000]">{title}</span>
        <span className="text-[#404040] text-[14px] font-normal">
          {description}
        </span>
      </div>
      <div className="flex  gap-[82px] ">
        <span className="text-base font-normal text-[#000]">{price} CHF</span>
        <span className="text-base font-normal text-[#000]">Std.</span>
        <span className="text-base font-normal text-[#000]">{count}</span>
        <span className="text-base font-semibold text-[#000]">{total} CHF</span>
      </div>
    </div>
  </div>
);
