import React from "react";
import TableLayout from "@/layout/TableLayout";
import { contractTableTypes } from "@/types/contract";
import { calculateTax } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { staticEnums } from "@/utils/static";

export interface ServiceDetailDataProps {
  contractDetails: contractTableTypes;
  currency?: string;
}

const ServiceDetailsData = ({
  contractDetails,
  currency,
}: ServiceDetailDataProps) => {
  const { t: translate } = useTranslation();

  const totalDiscount =
    contractDetails?.offerID?.serviceDetail?.serviceDetail?.reduce(
      (acc, service) => {
        const price = service?.discount || 0;
        return acc + price;
      },
      0
    );

  let serviceDiscountSum =
    contractDetails?.offerID?.serviceDetail?.serviceDetail?.reduce(
      (acc, service) => {
        const price = service?.discount || 0;
        return acc + price;
      },
      0
    );

  const updatedDiscountAmount =
    (contractDetails?.offerID?.subTotal / 100) *
    contractDetails?.offerID?.discountAmount;

  let discountPercentage;

  if (
    staticEnums["DiscountType"][
      contractDetails?.offerID
        ?.discountType as keyof (typeof staticEnums)["DiscountType"]
    ] === 1
  ) {
    discountPercentage =
      (contractDetails?.offerID?.discountAmount + serviceDiscountSum) /
      contractDetails?.offerID?.subTotal;
  } else {
    discountPercentage =
      ((contractDetails?.offerID?.discountAmount + serviceDiscountSum) /
        contractDetails?.offerID?.subTotal) *
      100;
  }

  const calculatedDiscount =
    contractDetails?.offerID?.discountType &&
    contractDetails?.offerID?.discountType === "Amount"
      ? contractDetails?.offerID?.discountAmount
      : calculateTax(
          Number(contractDetails?.offerID?.discountAmount),
          Number(contractDetails?.offerID?.subTotal)
        );

  const calculatedTax =
    (contractDetails?.offerID?.taxType &&
      calculateTax(
        Number(contractDetails?.offerID?.taxAmount),
        Number(
          Number(contractDetails?.offerID?.subTotal) -
            Number(
              contractDetails?.offerID?.isDiscount ? calculatedDiscount : 0
            )
        )
      )) ||
    0;

  return (
    <div
      className="rounded-md border-none bg-white w-full h-fit"
      id={translate("contracts.tabs_headings.service_details")}
    >
      <h2 className="text-[#fff] text-lg font-medium bg-[#C50EE0] py-5 px-6 rounded-t-lg">
        {translate("contracts.service_details.heading")}
      </h2>

      <div className="py-3 px-6">
        <div className="rounded-lg px-2 pt-3 bg-[#EDF4FF]">
          <TableLayout>
            <div className="grid xs:grid-cols-[minmax(160px,_160px)_minmax(200px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(150px,_150px)_minmax(120px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(150px,_150px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(110px,_110px)] mb-5">
              <span className="text-sm font-medium text-[#8F8F8F]">
                {translate("contracts.service_details.title")}
              </span>
              <span className="text-sm font-medium text-[#8F8F8F] mr-1">
                {translate("contracts.service_details.description")}
              </span>

              <span>
                {translate("contracts.service_details.price")}({currency})
              </span>
              <span>{translate("contracts.service_details.unit")}</span>
              <span>{translate("contracts.service_details.count")}</span>
              <span>
                {translate("offers.service_details.detail_headings.discount")}
              </span>
              <span>{translate("contracts.service_details.total_price")}</span>
            </div>

            {contractDetails?.offerID?.serviceDetail?.serviceDetail.map(
              (item, index) => (
                <div
                  className="grid xs:grid-cols-[minmax(160px,_160px)_minmax(200px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(150px,_150px)_minmax(120px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(150px,_150px)_minmax(120px,_100%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(110px,_110px)] text-sm font-medium text-[#4B4B4B] border-t border-t-[#000] border-opacity-10 py-5"
                  key={index}
                >
                  <span className="break-all text-base font-medium text-[#4B4B4B]">
                    {item.serviceTitle}
                  </span>
                  <span className="break-all text-base font-medium text-[#4B4B4B] mr-1">
                    {item.description}
                  </span>

                  <span className="text-base font-medium text-[#4B4B4B]">
                    {item.price}
                  </span>
                  <span className="text-base font-medium text-[#4B4B4B]">
                    {item.unit}
                  </span>
                  <span className="text-base font-medium text-[#4B4B4B]">
                    {item.count}
                  </span>
                  <span className="text-base font-medium text-[#4B4B4B]">
                    {item?.discount}
                  </span>
                  <span className="text-base font-medium text-[#4B4B4B]">
                    {item.totalPrice}
                  </span>
                </div>
              )
            )}

            <div className="border-t border-t-[#000] border-opacity-10">
              <div className="mt-5 border float-right border-[#EBEBEB] rounded-lg w-fit p-5 bg-white">
                <div className="grid grid-cols-3 border-b border-b-[#000] border-opacity-10 pb-3">
                  <div className="flex flex-col gap-2 border-r-[2px] border-r-[#EBEBEB]">
                    <span className="text-[#4D4D4D] text-sm font-normal">
                      {translate("contracts.service_details.sub_total")}
                    </span>
                    <span className="text-[#4B4B4B] text-base font-medium">
                      {contractDetails?.offerID?.subTotal}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 ml-5 pr-5 border-r-[2px] border-r-[#EBEBEB]">
                    <span className="text-[#4D4D4D] text-sm font-normal">
                      {translate("offers.service_details.detail_headings.tax")}
                    </span>
                    <span className="text-[#4B4B4B] text-base font-medium">
                      {/* {calculateTax(
                        contractDetails?.offerID?.total,
                        Number(contractDetails?.offerID?.taxAmount)
                      )} */}
                      {Number(calculatedTax).toFixed(2)} (
                      {contractDetails?.offerID?.taxAmount}%)
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 ml-5">
                    <span className="text-[#4D4D4D] text-sm font-normal">
                      {translate(
                        "offers.service_details.detail_headings.discount"
                      )}
                    </span>
                    <span className="text-[#4B4B4B] text-base font-medium">
                      {contractDetails?.offerID?.discountType === "Amount"
                        ? contractDetails?.offerID?.discountAmount +
                          totalDiscount
                        : calculateTax(
                            contractDetails?.offerID?.subTotal,
                            Number(contractDetails?.offerID?.discountAmount)
                          ) + totalDiscount}
                    </span>
                  </div>
                </div>

                <div className="float-right mt-3">
                  <span className="text-[#1E1E1E] text-base font-semibold">
                    {translate("pdf.grand_total")}:
                  </span>
                  <span className="text-[#1E1E1E] text-base font-semibold ml-3">
                    {contractDetails?.offerID?.total} {currency}
                  </span>
                </div>

                {/* <div className="grid grid-cols-2 mt-3">
                  <span className="text-[#1E1E1E] text-base font-semibold">
                    {translate("pdf.grand_total")}:
                  </span>

                  <span className="text-[#1E1E1E] text-base font-semibold ml-5">
                    {contractDetails?.offerID?.total} {currency}
                  </span>
                </div> */}
              </div>
            </div>
          </TableLayout>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsData;
