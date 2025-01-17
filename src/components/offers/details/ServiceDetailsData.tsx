import React from "react";
import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import { OffersTableRowTypes } from "@/types/offers";
import { calculateTax } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import TableLayout from "@/layout/TableLayout";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { staticEnums } from "@/utils/static";

export interface ServiceDetailDataProps {
  offerDetails: OffersTableRowTypes;
  currency?: string;
}

const ServiceDetailsData = ({
  offerDetails,
  currency,
}: ServiceDetailDataProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  // const totalDiscount = offerDetails?.serviceDetail?.serviceDetail?.reduce(
  //   (acc, service) => {
  //     const price = service?.discount || 0;
  //     return acc + price;
  //   },
  //   0
  // );

  let serviceDiscountSum = offerDetails?.serviceDetail?.serviceDetail?.reduce(
    (acc, service) => {
      const price = service?.discount || 0;
      return acc + price;
    },
    0
  );

  const updatedTotalDiscount =
    (offerDetails?.subTotal / 100) * offerDetails?.discountAmount;

  let discountPercentage;
  if (
    staticEnums["DiscountType"][
      offerDetails?.discountType as keyof (typeof staticEnums)["DiscountType"]
    ] === 1
  ) {
    discountPercentage =
      ((offerDetails?.discountAmount + serviceDiscountSum) /
        offerDetails.subTotal) *
      100;
  } else {
    discountPercentage =
      ((updatedTotalDiscount + serviceDiscountSum) / offerDetails?.subTotal) *
      100;
  }

  const calculatedDiscount =
    offerDetails?.discountType && offerDetails?.discountType === "Amount"
      ? offerDetails?.discountAmount
      : calculateTax(
          Number(offerDetails?.discountAmount),
          Number(offerDetails?.subTotal)
        );

  const calculatedTax =
    (offerDetails?.taxType &&
      calculateTax(
        Number(offerDetails?.taxAmount),
        Number(
          Number(offerDetails?.subTotal) -
            Number(offerDetails?.isDiscount ? calculatedDiscount : 0)
        )
      )) ||
    0;

  // const percentageDiscountVal =
  //   calculateTax(offerDetails?.subTotal, Number(offerDetails?.discountAmount)) +
  //   totalDiscount;

  const discountAmount =
    (Number(offerDetails?.discountAmount) / 100) *
    Number(offerDetails?.subTotal);

  const discountValue =
    offerDetails?.discountType && offerDetails?.discountType === "Amount"
      ? offerDetails?.discountAmount
      : discountAmount;

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between bg-[#C50EE0] py-5 px-6 rounded-t-lg"
        id={translate("offers.tabs_heading.service")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("offers.service_details.main_heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id, tab: 2 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit bg-white"
        >
          <EditIcon />
          {translate("offers.service_details.edit_button")}
        </button>
      </div>
      <div className="py-3 px-6">
        <div className="rounded-lg px-2 pt-3 bg-[#EDF4FF]">
          <TableLayout>
            <div className="grid xs:grid-cols-[minmax(300px,_100%)_minmax(400px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(150px,_3fr)_minmax(110px,_4fr)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] xlg:grid-cols-[minmax(120px,_3fr)_minmax(130px,_4fr)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(150px,_3fr)_minmax(120px,_4fr)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(110px,_110px)] pb-5">
              <span className="text-sm font-medium text-[#8F8F8F] mr-2">
                {translate("offers.service_details.detail_headings.title")}
              </span>
              <span className="text-sm font-medium text-[#8F8F8F]">
                {translate(
                  "offers.service_details.detail_headings.description"
                )}
              </span>

              <span className="text-sm font-medium">
                {translate("offers.service_details.detail_headings.count")}
              </span>
              <span className="text-sm font-medium">
                {translate("offers.service_details.detail_headings.unit")}
              </span>
              <span className="text-sm font-medium">
                {translate("offers.service_details.detail_headings.price")}(
                {currency})
              </span>

              <span className="text-sm font-medium">
                {translate("offers.service_details.detail_headings.discount")}
              </span>

              <span className="text-sm font-medium">
                {translate(
                  "offers.service_details.detail_headings.total_price"
                )}
              </span>
            </div>

            {offerDetails?.serviceDetail?.serviceDetail.map((item, index) => (
              <div
                className="grid xs:grid-cols-[minmax(300px,_100%)_minmax(400px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(150px,_3fr)_minmax(110px,_4fr)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] xlg:grid-cols-[minmax(120px,_3fr)_minmax(130px,_4fr)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(150px,_3fr)_minmax(120px,_4fr)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(110px,_110px)] text-sm font-medium text-[#4B4B4B] border-t border-t-[#000] border-opacity-10 py-5"
                key={index}
              >
                <span className="text-sm font-medium text-[#4B4B4B] break-all mr-5">
                  {item?.serviceTitle}
                </span>
                <span className="text-sm font-medium text-[#4B4B4B] break-all mr-5">
                  {item?.description}
                </span>

                <span className="text-sm font-medium text-[#4B4B4B]">
                  {item?.count}
                </span>

                <span className="text-sm font-medium text-[#4B4B4B]">
                  {item?.unit}
                </span>

                <span className="text-sm font-medium text-[#4B4B4B]">
                  {item?.price}
                </span>

                <span className="text-sm font-medium text-[#4B4B4B]">
                  {item?.discount}
                </span>
                <span className="text-sm font-medium text-[#4B4B4B]">
                  {item?.totalPrice.toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t border-t-[#000] border-opacity-10">
              <div className="mt-5 border float-right border-[#EBEBEB] rounded-lg w-fit p-5 bg-white">
                <div className="grid grid-cols-3 border-b border-b-[#000] border-opacity-10 pb-3">
                  <div className="flex flex-col gap-2 border-r-[2px] border-r-[#EBEBEB]">
                    <span className="text-[#4D4D4D] text-sm font-normal">
                      {translate(
                        "offers.service_details.detail_headings.sub_total"
                      )}
                    </span>
                    <span className="text-[#4B4B4B] text-base font-medium">
                      {offerDetails?.subTotal}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 ml-5 pr-5 border-r-[2px] border-r-[#EBEBEB]">
                    <span className="text-[#4D4D4D] text-sm font-normal">
                      {translate("offers.service_details.detail_headings.tax")}
                    </span>
                    <span className="text-[#4B4B4B] text-base font-medium">
                      {/* {calculateTax(
                        offerDetails?.total,
                        Number(offerDetails?.taxAmount)
                      )} */}
                      {Number(calculatedTax).toFixed(2)} (
                      {offerDetails?.taxAmount}%)
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 ml-5">
                    <span className="text-[#4D4D4D] text-sm font-normal">
                      {translate(
                        "offers.service_details.detail_headings.discount"
                      )}
                    </span>
                    <span className="text-[#4B4B4B] text-base font-medium">
                      {discountValue && discountValue.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="float-right mt-3">
                  <span className="text-[#1E1E1E] text-base font-semibold">
                    {translate(
                      "offers.service_details.detail_headings.grand_total"
                    )}
                    :
                  </span>
                  <span className="text-[#1E1E1E] text-base font-semibold ml-3">
                    {offerDetails?.total} {currency}
                  </span>
                </div>
              </div>
            </div>
          </TableLayout>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default ServiceDetailsData;
