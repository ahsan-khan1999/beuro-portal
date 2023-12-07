import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import Image from "next/image";
import { OffersTableRowTypes } from "@/types/offers";
import { filterService } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import TableLayout from "@/layout/TableLayout";

const ServiceDetailsData = ({ offerDetails }: { offerDetails: OffersTableRowTypes }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const serviceHeading: string[] = [
    `${translate("offers.service_details.detail_headings.title")}`,
    `${translate("offers.service_details.detail_headings.description")}`,
    `${translate("offers.service_details.detail_headings.price")}`,
    `${translate("offers.service_details.detail_headings.unit")}`,
    `${translate("offers.service_details.detail_headings.count")}`,
    `${translate("offers.service_details.detail_headings.total_price")}`,
  ];

  const serviceData: serviceData[] = [
    {
      title: `2 Mitarbeiter  Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      price: "1000",
      unit: "Std.",
      count: "2",
      total_price: "2000CHF",
    },
    {
      title: `2 Mitarbeiter  Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      price: "1000",
      unit: "Std.",
      count: "2",
      total_price: "2000CHF",
    },
    {
      title: `2 Mitarbeiter  Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      price: "1000",
      unit: "Std.",
      count: "2",
      total_price: "2000CHF",
    },
    {
      title: `2 Mitarbeiter  Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      price: "1000",
      unit: "Std.",
      count: "2",
      total_price: "2000CHF",
    },
  ];

  return (
    <LeadsCardLayout>
      <div className="flex justify-between  pb-5 " id="Service Details">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.service_details.main_heading")}
        </h2>
        <button
          onClick={() => router.push({
            pathname: "/offers/edit",
            query: { offer: offerDetails?.id },
          })}
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          {translate("offers.service_details.edit_button")}
        </button>
      </div>

      <hr className="opacity-20 mb-5" />
      <TableLayout>

        <div className="mt-5">
          <div className="bg-white grid grid-cols-[minmax(250px,_100%)_minmax(300px,_100%)_minmax(130px,_100%)_minmax(80px,_100%)_minmax(80px,_100%)_minmax(92px,_92px)] mb-[28px]">
            <span className="text-[14px] font-medium text-[#8F8F8F]">
              Service/Product Title
            </span>
            <span className="text-[14px] font-medium text-[#8F8F8F]">
              Description
            </span>

            <span>Price(CHF)</span>
            <span> Unit</span>
            <span> Count</span>
            <span> Total Price</span>
          </div>

          {offerDetails?.serviceDetail?.serviceDetail.map((item, index) => (
            <div
              className="grid grid-cols-[minmax(250px,_100%)_minmax(300px,_100%)_minmax(130px,_100%)_minmax(80px,_100%)_minmax(80px,_100%)_minmax(92px,_92px)]  mb-[18px] text-[14px] font-medium text-[#4B4B4B]"
              key={index}
            >
              <span>{item?.serviceTitle}</span>
              <span>{item?.description}</span>

              <span>{item?.price}</span>
              <span> {item?.unit}</span>
              <span> {item?.count}</span>
              <span> {item?.totalPrice}</span>
            </div>

          ))}
        </div>
      </TableLayout>
      <hr className="opacity-20 mt-[40px]" />

      <div className="mt-5 border float-right border-[#EBEBEB] rounded-lg w-fit p-5">
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-2 border-r-[2px] border-r-[#EBEBEB]">
            <span className="text-[#4D4D4D] text-[14px] font-normal">
              {translate("offers.service_details.detail_headings.sub_total")}
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {offerDetails?.subTotal}
            </span>
          </div>
          <div className="flex flex-col gap-2 ml-5">
            <span className="text-[#4D4D4D] text-[14px] font-normal">
              {" "}
              {translate("offers.service_details.detail_headings.tax")}
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              {offerDetails?.taxAmount} (7.7%)

            </span>
          </div>
        </div>

        <hr className="opacity-20 mt-2" />

        <div className="grid grid-cols-2 mt-3">
          <span className="text-[#1E1E1E] text-base font-semibold">
            {translate("offers.service_details.detail_headings.grand_total")}:
          </span>

          <span className="text-[#1E1E1E] text-base font-semibold ml-5">
            {offerDetails?.total} CHF
          </span>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default ServiceDetailsData;
