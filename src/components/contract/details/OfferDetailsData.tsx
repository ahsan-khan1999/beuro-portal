import React, { useState } from "react";
import { contractTableTypes } from "@/types/contract";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit_primary.svg";
import { Button } from "@/base-components/ui/button/button";

export interface ContarctOfferDetailProps {
  contractDetails: contractTableTypes;
  onEditAdditionDetails: () => void;
  isEditing: boolean;
  onComponentChange: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleChange: (data: any) => Promise<void>;
  value: string;
  onChangeValue: React.Dispatch<React.SetStateAction<string>>;
}

const OfferDetailsData = ({
  contractDetails,
  isEditing,
  onComponentChange,
  onHandleChange,
  onChangeValue,
}: ContarctOfferDetailProps) => {
  const { t: translate } = useTranslation();
  const [isFieldModified, setIsFieldModified] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value);
    setIsFieldModified(true);
  };

  return (
    <div
      className="rounded-md border-none bg-white w-full h-fit"
      id={translate("contracts.card_content.heading")}
    >
      <h2 className="text-[#fff] text-xl font-medium bg-[#4A13E7] py-5 px-6 rounded-t-lg">
        {translate("contracts.card_content.heading")}
      </h2>

      <div className="py-3 px-6">
        <div className="rounded-lg px-2 py-3 bg-[#EDF4FF]">
          <div className="mb-5">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              {translate("contracts.customer_details.title")}
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white min-h-[58px] truncate flex items-center justify-between pr-4">
              {isEditing === false ? (
                <span className="text-[#4B4B4B] font-medium px-4 truncate">
                  {contractDetails?.title}
                </span>
              ) : (
                <input
                  type="text"
                  defaultValue={contractDetails?.title}
                  onChange={handleInputChange}
                  className="p-4 min-h-[58px] w-[70%] outline-none text-dark text-sm focus:border-primary truncate"
                />
              )}
              <div className="flex items-center">
                {isEditing  ? (
                  <Image
                    src={editIcon}
                    alt="edit"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                    onClick={() => onComponentChange(true)}
                  />
                  
                ) : (
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={() => onComponentChange(false)}
                      className="text-[#4B4B4B] hover:text-white font-medium rounded-lg border border-[#4A13E7] py-[5px] px-4 max-w-[131px] w-full bg-white hover:bg-buttonHover"
                    >
                      {translate("leads.additional.cancel_button")}
                    </button>
                    <Button
                      onClick={onHandleChange}
                      className={`!h-fit py-2 px-[10px] mt-0 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap ${
                        isFieldModified
                          ? "cursor-pointer hover:bg-buttonHover"
                          : "cursor-not-allowed hover:bg-primary"
                      }`}
                      text={translate(
                        "setting.account_setting.save_changes_button"
                      )}
                      id="apply"
                      inputType="button"
                      iconAlt="button"
                      disabled={!isFieldModified}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mlg:grid-cols-3 gap-x-3 gap-y-5 ">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.customer_type")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium">
                {translate(
                  `customer_type.${getKeyByValue(
                    staticEnums["CustomerType"],
                    contractDetails.offerID?.leadID?.customerDetail
                      ?.customerType
                  )}`
                )}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.full_name")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {contractDetails.offerID?.leadID?.customerDetail?.fullName}
              </div>
            </div>
            {staticEnums["CustomerType"][
              contractDetails?.offerID?.leadID?.customerDetail?.customerType
            ] === 1 && (
              <div>
                <label className="text-[#4D4D4D] mb-3 block text-sm">
                  {translate("contracts.customer_details.company_name")}
                </label>
                <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
                  {
                    contractDetails?.offerID?.leadID?.customerDetail
                      ?.companyName
                  }
                </div>
              </div>
            )}
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.email_address")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {contractDetails?.offerID?.leadID?.customerDetail?.email}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.phone_number")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {contractDetails?.offerID?.leadID?.customerDetail?.phoneNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.mobile_number")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {contractDetails?.offerID?.leadID?.customerDetail?.mobileNumber}
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("customers.details.gender")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px]">
                {contractDetails?.offerID?.leadID?.customerDetail?.gender}
              </div>
            </div>
            {/* <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("login_detail.company_details.company_name")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {contractDetails?.offerID?.leadID?.customerDetail?.companyName}
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-[#1E1E1E] text-base font-semibold mb-[10px]">
            {translate("contracts.customer_details.address_details")}
          </h4>
          <div className="grid grid-cols-2 mlg:grid-cols-3 gap-x-3 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.street_no")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {
                  contractDetails?.offerID?.leadID?.customerDetail?.address
                    ?.streetNumber
                }
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.post_code")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {
                  contractDetails?.offerID?.leadID?.customerDetail?.address
                    ?.postalCode
                }
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                {translate("contracts.customer_details.country")}
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium min-h-[58px] truncate">
                {
                  contractDetails?.offerID?.leadID?.customerDetail?.address
                    ?.country
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsData;
