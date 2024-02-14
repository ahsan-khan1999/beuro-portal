import { useAppSelector } from "@/hooks/useRedux";
import { ServiceList } from "@/types/offers";
import { ProductItemProps } from "@/types/types";

export const ProductDiscountItem = ({
    count,
    description,
    price,
    serviceTitle,
    totalPrice,
    unit,
    discount,
    isDiscount,
    totalDiscount,
    pagebreak,
    isGlobalDiscount,
    
}: ServiceList) => {
    const { systemSettings } = useAppSelector((state) => state.settings);
    return (
        <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] py-3 mb-3">
            <div className="grid grid-cols-3 gap-x-2 items-center">
                <div className="col-span-1 flex flex-col gap-y-1 pl-3 ">
                    <span className="text-sm font-normal text-[#000]">
                        {serviceTitle}
                    </span>

                </div>
                <div className="col-span-1 flex flex-col gap-y-1 pl-3 ">
                    <span className="text-[#404040] text-[14px] font-normal break-all">
                        {description}
                    </span>
                </div>

                <div className="col-span-1 flex space-x-2 justify-center items-center pr-[46px] w-full">
                    <span className="text-sm font-normal text-[#000] min-w-[50px]">{count}</span>
                    <span className="text-sm font-normal text-[#000] min-w-[50px]">{unit}</span>
                    <span className="text-sm font-normal text-[#000] min-w-[50px]">{isGlobalDiscount ? price : totalDiscount} </span>
                    {isDiscount && <span className="text-sm font-normal text-[#000] min-w-[50px]">{isGlobalDiscount ? discount : totalDiscount || "-"} </span>}

                    <span className="text-sm font-semibold text-[#000] min-w-[50px]">
                        {isGlobalDiscount ? Number(discount || 0) + Number(totalDiscount || 0) : totalDiscount}
                    </span>
                </div>
            </div>
        </div>
    )
};
