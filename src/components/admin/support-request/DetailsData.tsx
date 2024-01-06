import { SupportRequestAdmin } from "@/types/admin/support-request";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import groupCustomerIcon from "@/assets/svgs/group_customer_icon.svg";
import { useRouter } from "next/router";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { DropDownItem } from "@/types";
import { ContactSupport } from "@/api/slices/contactSupport/contactSupportSlice";
import { formatDateTimeToDate } from "@/utils/utility";

const DetailsData = ({
  supportDetail,
  status,
  handlePreviousClick,
  handleStatusUpadte,
}: {
  supportDetail: ContactSupport | null;
  status: DropDownItem[];
  handlePreviousClick: () => void;
  handleStatusUpadte: (value: string) => void;
}) => {
  const { t: translate } = useTranslation();

  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <div onClick={handlePreviousClick} className="cursor-pointer">
            <Image src={backIcon} alt="backIcon" />
          </div>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("admin.support_requests.card_content.heading")}
          </h1>
        </div>
        <button
          onClick={() =>
            router.push({
              pathname: "/admin/customers/details",
              query: { customer: supportDetail?.createdBy?.id },
            })
          }
          className="flex items-center rounded-lg border border-[#C7C7C7] px-4 py-[11px] text-[#4B4B4B] font-medium gap-3"
        >
          <Image src={groupCustomerIcon} alt="groupCustomerIcon" />
          {translate("admin.support_requests.card_content.button")}
        </button>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div className="flex flex-col gap-y-3 xl:flex-row xl:space-x-20 xl:items-center ">
        <h3 className="text-[#4D4D4D] ">
          {translate("admin.support_requests.card_content.customer_id")}:
          <span className="text-[#4B4B4B] font-medium ml-3">
            {supportDetail?.createdBy?.company?.refID}
          </span>
        </h3>
        <h3 className="text-[#4D4D4D] ">
          {translate("admin.support_requests.card_content.request_date")}:
          <span className="ml-3 text-[#4B4B4B] font-medium">
            {supportDetail && formatDateTimeToDate(supportDetail?.createdAt)}
          </span>
        </h3>
        <h3 className="text-[#4D4D4D] flex items-center">
          {translate("admin.support_requests.card_content.status")}:
          <span className="ml-3 text-[#4B4B4B] font-medium">
            <DropDown
              items={status}
              onItemSelected={(selectedItem) =>
                handleStatusUpadte(selectedItem)
              }
              selectedItem={supportDetail?.status || ""}
              dropDownClassName="px-3 border border-primary"
              dropDownTextClassName="text-primary font-medium"
              dropDownIconClassName="text-primary ml-2"
              dropDownItemsContainerClassName="border border-primary w-full"
            />
          </span>
        </h3>
      </div>
    </>
  );
};

export default DetailsData;
