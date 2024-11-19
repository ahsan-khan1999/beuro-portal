import { ServiceList } from "@/types/offers";

export const ServiceItem = ({
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
}: ServiceList) => {
  return (
    <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] py-5 px-3 mb-5">
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-1 flex flex-col gap-y-1">
          <span className="text-sm font-normal break-all mr-5">
            {serviceTitle}
          </span>
        </div>
        <div className="col-span-1 flex flex-col gap-y-1">
          <span className="text-[#404040] text-sm font-normal break-all mr-5">
            {description}
          </span>
        </div>
        <div className="col-span-1 flex space-x-2 items-center pr-[44px] w-full">
          <span className="text-sm font-normal min-w-[50px] break-all">
            {count}
          </span>
          <span className="text-sm font-normal min-w-[50px] break-all">
            {unit}
          </span>
          <span className="text-sm font-normal min-w-[50px] break-all">
            {price}
          </span>
          {isDiscount && (
            <span className="text-sm font-normal w-[62px] break-all">
              {discount || "-"}
            </span>
          )}

          <span className="text-sm font-semibold min-w-[50px] break-all">
            {pagebreak
              ? Number(discount || 0) + Number(totalDiscount || 0)
              : totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};
