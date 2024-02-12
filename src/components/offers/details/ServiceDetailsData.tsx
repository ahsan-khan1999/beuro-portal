import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { calculateTax, filterService } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import TableLayout from "@/layout/TableLayout";
import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

const ServiceDetailsData = ({
  offerDetails,
  currency,
}: {
  offerDetails: OffersTableRowTypes;
  currency?: string;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const totalDiscount = offerDetails?.serviceDetail?.serviceDetail?.reduce(
    (acc, service) => {
      const price = service?.discount || 0;
      return acc + price;
    },
    0
  );
  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between pb-5 border-b border-[#e5e5e5]"
        id={translate("offers.tabs_heading.service")}
      >
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.service_details.main_heading")}
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/offers/edit",
              query: { offer: offerDetails?.id, tab: 2 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
        >
          <EditIcon />
          {translate("offers.service_details.edit_button")}
        </button>
      </div>
      <TableLayout>
        <div className="mt-[23px] border-b border-[#e5e5e5] mb-10">
          <div className="bg-white grid xs:grid-cols-[minmax(160px,_160px)_minmax(200px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(150px,_150px)_minmax(120px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(150px,_150px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(110px,_110px)] mb-[28px]">
            <span className="text-[14px] font-medium text-[#8F8F8F]">
              {translate("offers.service_details.detail_headings.title")}
            </span>
            <span className="text-[14px] font-medium text-[#8F8F8F] mx-2   ">
              {translate("offers.service_details.detail_headings.description")}
            </span>
            <span>
              {translate("offers.service_details.detail_headings.price")}(
              {currency})
            </span>
            <span>
              {translate("offers.service_details.detail_headings.unit")}
            </span>
            <span>
              {translate("offers.service_details.detail_headings.count")}
            </span>
            <span>
              {translate("offers.service_details.detail_headings.discount")}
            </span>

            <span>
              {translate("offers.service_details.detail_headings.total_price")}
            </span>
          </div>

          {offerDetails?.serviceDetail?.serviceDetail.map((item, index) => (
            <div
              className="grid xs:grid-cols-[minmax(160px,_160px)_minmax(200px,_100%)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)] mlg:grid-cols-[minmax(150px,_150px)_minmax(120px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(150px,_150px)_minmax(120px,_100%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(110px,_110px)] mb-[18px] text-[14px] font-medium text-[#4B4B4B]"
              key={index}
            >
              <span className="text-base font-medium text-[#4B4B4B]">
                {item?.serviceTitle}
              </span>
              <span className="text-base font-medium text-[#4B4B4B] break-all mx-2">
                {item?.description}
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {item?.price}
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {item?.unit}
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {item?.count}
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {item?.discount}
              </span>
              <span className="text-base font-medium text-[#4B4B4B]">
                {item?.totalPrice}
              </span>
            </div>
          ))}

          <div className="mt-5 border float-right border-[#EBEBEB] rounded-lg w-fit p-5">
            <div className="grid grid-cols-3">
              <div className="flex flex-col gap-2 border-r-[2px] border-r-[#EBEBEB]">
                <span className="text-[#4D4D4D] text-[14px] font-normal">
                  {translate(
                    "offers.service_details.detail_headings.sub_total"
                  )}
                </span>
                <span className="text-[#4B4B4B] text-base font-medium">
                  {offerDetails?.subTotal}
                </span>
              </div>
              <div className="flex flex-col gap-2 ml-5 pr-5 border-r-[2px] border-r-[#EBEBEB]">
                <span className="text-[#4D4D4D] text-[14px] font-normal">
                  {translate("offers.service_details.detail_headings.tax")}
                </span>
                <span className="text-[#4B4B4B] text-base font-medium">
                  {calculateTax(
                    offerDetails?.total,
                    Number(offerDetails?.taxAmount)
                  )}{" "}
                  ({offerDetails?.taxAmount}%)
                </span>
              </div>
              <div className="flex flex-col gap-2 ml-5">
                <span className="text-[#4D4D4D] text-[14px] font-normal">
                  {translate("offers.service_details.detail_headings.discount")}
                </span>
                <span className="text-[#4B4B4B] text-base font-medium">
                  {offerDetails?.discountType === "Amount"
                    ? offerDetails?.discountAmount + totalDiscount
                    : calculateTax(
                        offerDetails?.subTotal,
                        Number(offerDetails?.discountAmount)
                      ) + totalDiscount}
                </span>
              </div>
            </div>

            <hr className="opacity-20 mt-2" />

            <div className="grid grid-cols-2 mt-3">
              <span className="text-[#1E1E1E] text-base font-semibold">
                {translate(
                  "offers.service_details.detail_headings.grand_total"
                )}
                :
              </span>
              <span className="text-[#1E1E1E] text-base font-semibold ml-5">
                {offerDetails?.total} {currency}
              </span>
            </div>
          </div>
        </div>
      </TableLayout>
    </LeadsCardLayout>
  );
};

export default ServiceDetailsData;
