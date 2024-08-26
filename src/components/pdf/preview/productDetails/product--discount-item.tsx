import { useAppSelector } from "@/hooks/useRedux";
import { ServiceList } from "@/types/offers";
import { staticEnums } from "@/utils/static";

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
  discountPercentage,
  discountType,
  updatedDiscountAmount,
}: ServiceList) => {
  const { systemSettings } = useAppSelector((state) => state.settings);

  const totalUpdatedAmount =
    Number(totalDiscount || 0) + Number(updatedDiscountAmount || 0);

  const totalAmount = Number(discount || 0) + Number(totalDiscount || 0);

  return (
    <div className="flex flex-col bg-[#F6F7F8] rounded-[4px] py-3 mb-3  pl-3">
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-1 flex flex-col gap-y-1">
          <span className="text-sm font-normal text-[#000]">
            {serviceTitle}
          </span>
        </div>
        <div className="col-span-1 flex flex-col gap-y-1">
          <span className="text-[#404040] text-[14px] font-normal break-all">
            {description}
          </span>
        </div>

        <div className="col-span-1 flex space-x-2 items-center pr-[46px] w-full">
          <span className="text-sm font-normal text-[#000] min-w-[50px] break-all">
            {count}
          </span>
          <span className="text-sm font-normal text-[#000] min-w-[50px] break-all">
            {unit}
          </span>
          <span className="text-sm font-normal text-[#000] min-w-[50px] break-all">
            {isGlobalDiscount ? price : totalDiscount}{" "}
          </span>
          {isDiscount && (
            <span className="text-sm font-normal text-[#000] min-w-[50px] break-all">
              {!isGlobalDiscount ? discount : totalDiscount || "-"}{" "}
            </span>
          )}

          {/* <span className="text-sm font-semibold min-w-[70px] break-all"> */}
          {/* {isGlobalDiscount
              ? Number(discount || 0) + Number(totalDiscount || 0)
              : totalDiscount}{" "}
            ({discountPercentage?.toFixed(1)}%) */}

          {staticEnums["DiscountType"][
            discountType as keyof (typeof staticEnums)["DiscountType"]
          ] === 0 ? (
            <span
              className={`${
                totalUpdatedAmount >= 10000
                  ? "text-[9px]"
                  : totalUpdatedAmount >= 1000
                  ? "text-[10px]"
                  : "text-xs"
              } font-semibold min-w-[70px] break-all`}
            >
              {isGlobalDiscount
                ? (
                    Number(totalDiscount || 0) +
                    Number(updatedDiscountAmount || 0)
                  ).toFixed(1)
                : updatedDiscountAmount}{" "}
              <span className="text-[8px]">
                ({discountPercentage?.toFixed(1)}%)
              </span>
            </span>
          ) : (
            <span
              className={`${
                totalAmount >= 10000
                  ? "text-[9px]"
                  : totalAmount >= 1000
                  ? "text-[10px]"
                  : "text-xs"
              } font-semibold min-w-[70px] break-all`}
            >
              {isGlobalDiscount
                ? (Number(discount || 0) + Number(totalDiscount || 0)).toFixed(
                    1
                  )
                : totalDiscount}{" "}
              <span className="text-[8px]">
                ({discountPercentage?.toFixed(1)}%)
              </span>
            </span>
          )}
          {/* </span> */}
        </div>
      </div>
    </div>
  );
};
