import { useAppSelector } from "@/hooks/useRedux";
import { ServiceList } from "@/types/offers";
import { ProductItemProps } from "@/types/types";

export const ProductItem = ({
  count,
  description,
  price,
  serviceTitle,
  totalPrice,
}: ServiceList) => {
  const { systemSettings } = useAppSelector((state) => state.settings);
  return (
    <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] py-3 mb-3">
      <div className="grid grid-cols-3 gap-x-2 items-center">
        <div className="col-span-2 flex flex-col gap-y-1 pl-3">
          <span className="text-base font-normal text-[#000]">
            {serviceTitle}
          </span>
          <span className="text-[#404040] text-[14px] font-normal break-all">
            {description}
          </span>
        </div>
        <div className="col-span-1 flex justify-between items-center pr-[46px]">
          <span className="text-base font-normal text-[#000]">{price} </span>
          <span className="text-base font-normal text-[#000]">Std.</span>
          <span className="text-base font-normal text-[#000]">{count}</span>
          <span className="text-base font-semibold text-[#000]">
            {totalPrice} {systemSettings?.currency}
          </span>
        </div>
      </div>
    </div>
  )
};
