import React from "react";
import { Lead } from "@/types/leads";
import { useRouter } from "next/router";
import { formatDate, getStatusColor } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";

export interface LeadTableProps {
  dataToAdd: Lead[];
  openModal: (item: string, e: React.MouseEvent<HTMLSpanElement>) => void;
  handleImageUpload: (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  onStatusChange: (id: string, status: string, type: string) => void;
}

const TableRows = ({
  dataToAdd,
  openModal,
  handleImageUpload,
  onStatusChange,
}: LeadTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const itemsValue = [
    `${translate("leads.lead_dropdown_status.Open")}`,
    `${translate("leads.lead_dropdown_status.InProcess")}`,
    `${translate("leads.lead_dropdown_status.Close")}`,
    `${translate("leads.lead_dropdown_status.Expired")}`,
  ];

  const items = Object.keys(staticEnums["LeadStatus"]).map((item, index) => ({
    item: { label: itemsValue[index], value: item },
  }));

  return (
    <div
      className={`overflow-y-visible ${
        dataToAdd && dataToAdd.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {dataToAdd?.map((item: Lead, index: number) => {
        return (
          <div
            onClick={() => {
              router.push({
                pathname: "/leads/details",
                query: { ...router.query, lead: item?.id },
              });
            }}
            key={index}
            className="cursor-pointer items-center hover:bg-[#E9E1FF] gap-x-4 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(250px,4fr)_minmax(300px,_3fr)_minmax(150px,150px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(170px,_170px)_minmax(70px,_70px)_minmax(70px,_70px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px)_minmax(50px,_4fr)_minmax(130px,_130px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(50px,_50px)_minmax(80px,_4fr)_minmax(130px,_130px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(50px,_50px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(50px,_50px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(70px,4fr)_minmax(70px,_3fr)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(190px,_190px)_minmax(60px,_60px)_minmax(60px,_60px)_minmax(50px,_50px)] border-t border-t-[#E7EAEE]"
          >
            <span className="py-4 truncate">{item?.refID}</span>
            <span className="py-4 truncate">
              {item.customerDetail?.fullName}
            </span>
            <span className="py-4 truncate block mlg:hidden maxSize:block">
              {item.customerDetail?.email}
            </span>
            <span className="py-4 truncate mlg:hidden xLarge:block">
              {item.customerDetail?.phoneNumber}
            </span>
            <span className="py-4 flex items-center">
              {formatDate(item.createdAt)}
            </span>
            <span className="py-4 truncate mlg:hidden xMaxSize:block">
              {item.customerDetail?.address?.country}
            </span>
            {/* <span className={`py-4 flex items-center`}>
              <div
                style={{
                  backgroundColor: `${getStatusColor(item.leadStatus)}`,
                }}
                className={`text-white px-2 py-1 text-center rounded-md min-w-[70px] w-full text-sm`}
              >
                {translate(`leads.lead_dropdown_status.${item.leadStatus}`)}
              </div>
            </span> */}
            <span
              className="py-4 flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <DropDown
                key={item.id}
                items={items}
                selectedItem={translate(
                  `leads.lead_dropdown_status.${item?.leadStatus}`
                )}
                onItemSelected={(status) => {
                  onStatusChange(item.id, status, "lead");
                }}
                dropDownClassName={`bg-[${getStatusColor(
                  item?.leadStatus
                )}] w-full rounded-lg px-4 py-[3px] flex items-center justify-center`}
                dropDownTextClassName={`text-white text-base font-medium me-1`}
                dropDownItemsContainerClassName="w-full"
                dropDownIconClassName={"text-white"}
                isSecondLastIndex={
                  dataToAdd &&
                  dataToAdd.length > 5 &&
                  index === dataToAdd.length - 2
                }
                isLastIndex={
                  dataToAdd &&
                  dataToAdd.length > 5 &&
                  index === dataToAdd.length - 1
                }
                isLead={true}
              />
            </span>
            <span
              className="py-4 flex justify-center items-center cursor-pointer"
              onClick={(e) => handleImageUpload(item?.id, e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
              >
                <rect
                  x="1.36719"
                  y="0.69043"
                  width="31.1684"
                  height="31"
                  rx="7.5"
                  fill="white"
                  stroke={item.isImageAdded ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M15.4044 22.0518H12.1297C11.1072 22.0518 10.2753 21.2199 10.2753 20.1974V11.7908C10.2753 10.7683 11.1072 9.93645 12.1297 9.93645H20.5362C21.5588 9.93645 22.3906 10.7683 22.3906 11.7908V15.1624C22.3906 15.5038 22.6674 15.7805 23.0088 15.7805C23.3501 15.7805 23.6269 15.5038 23.6269 15.1624V11.7908C23.6269 10.0867 22.2405 8.7002 20.5362 8.7002H12.1297C10.4255 8.7002 9.03906 10.0867 9.03906 11.7908V20.1974C9.03906 21.9016 10.4255 23.288 12.1297 23.288H15.4044C15.7458 23.288 16.0225 23.0113 16.0225 22.6699C16.0225 22.3285 15.7458 22.0518 15.4044 22.0518Z"
                  fill={item.isImageAdded ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M24.3194 17.3499C23.5963 16.6269 22.4199 16.6269 21.6969 17.3499L18.5623 20.4845C17.6484 21.3984 17.145 22.6136 17.145 23.9061C17.145 24.2475 17.4218 24.5243 17.7631 24.5243C19.0557 24.5243 20.2709 24.0209 21.1849 23.1069L24.3194 19.9724C25.0424 19.2494 25.0424 18.0729 24.3194 17.3499ZM23.4452 18.224C23.6863 18.4651 23.6863 18.8572 23.4452 19.0982L23.0081 19.5353L22.134 18.6611L22.5711 18.224C22.8121 17.983 23.2043 17.983 23.4452 18.224ZM20.3107 22.2328C19.7939 22.7495 19.1478 23.09 18.4454 23.2239C18.5793 22.5215 18.9198 21.8754 19.4365 21.3586L21.2598 19.5353L22.134 20.4095L20.3107 22.2328Z"
                  fill={item.isImageAdded ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M13.2906 14.7004L11.6923 16.2988C11.4509 16.5402 11.4509 16.9316 11.6923 17.173C11.9337 17.4144 12.3251 17.4144 12.5665 17.173L14.1648 15.5746C14.4058 15.3336 14.7979 15.3336 15.0389 15.5746L18.192 18.7277C18.4334 18.9691 18.8248 18.9691 19.0662 18.7277C19.3075 18.4863 19.3075 18.0949 19.0662 17.8535L15.9131 14.7004C15.1901 13.9775 14.0137 13.9775 13.2906 14.7004Z"
                  fill={item.isImageAdded ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M19.3026 14.8806C18.2801 14.8806 17.4482 14.0488 17.4482 13.0263C17.4482 12.0038 18.2801 11.1719 19.3026 11.1719C20.3251 11.1719 21.157 12.0038 21.157 13.0263C21.157 14.0488 20.3251 14.8806 19.3026 14.8806ZM19.3026 12.4081C18.9618 12.4081 18.6845 12.6854 18.6845 13.0263C18.6845 13.3671 18.9618 13.6444 19.3026 13.6444C19.6435 13.6444 19.9208 13.3671 19.9208 13.0263C19.9208 12.6854 19.6435 12.4081 19.3026 12.4081Z"
                  fill={item.isImageAdded ? "#FF0000" : "#4A13E7"}
                />
              </svg>
            </span>

            <span
              className="py-4 flex justify-center items-center  cursor-pointer "
              onClick={(e) => openModal(item?.id, e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
              >
                <rect
                  x="1.03711"
                  y="0.69043"
                  width="31.1684"
                  height="31"
                  rx="7.5"
                  fill="white"
                  stroke={item.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M20.0838 15.499C20.0838 15.1576 19.8071 14.8809 19.4657 14.8809H13.0991C12.7577 14.8809 12.481 15.1576 12.481 15.499C12.481 15.8404 12.7577 16.1171 13.0991 16.1171H19.4657C19.8071 16.1171 20.0838 15.8404 20.0838 15.499Z"
                  fill={item.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M13.0991 17.3535C12.7577 17.3535 12.481 17.6302 12.481 17.9716C12.481 18.313 12.7577 18.5897 13.0991 18.5897H16.9657C17.3071 18.5897 17.5838 18.313 17.5838 17.9716C17.5838 17.6302 17.3071 17.3535 16.9657 17.3535H13.0991Z"
                  fill={item.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M14.5505 23.2877H12.4832C11.8015 23.2877 11.247 22.7332 11.247 22.0515V11.1727C11.247 10.491 11.8015 9.93643 12.4832 9.93643H20.0826C20.7643 9.93643 21.3188 10.491 21.3188 11.1727V14.9741C21.3188 15.3155 21.5956 15.5922 21.937 15.5922C22.2783 15.5922 22.5551 15.3155 22.5551 14.9741V11.1727C22.5551 9.80934 21.4459 8.7002 20.0826 8.7002H12.4832C11.1199 8.7002 10.0107 9.80934 10.0107 11.1727V22.0515C10.0107 23.4148 11.1199 24.524 12.4832 24.524H14.5505C14.8919 24.524 15.1686 24.2472 15.1686 23.9059C15.1686 23.5645 14.8919 23.2877 14.5505 23.2877Z"
                  fill={item.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M23.6495 17.6498C22.9265 16.9267 21.7501 16.9267 21.0275 17.6493L17.634 21.0353C17.5619 21.1072 17.5087 21.1958 17.4791 21.2932L16.7401 23.7263C16.6746 23.942 16.7316 24.1762 16.8891 24.3376C17.007 24.4585 17.1672 24.5241 17.3316 24.5241C17.3865 24.5241 17.442 24.5167 17.4965 24.5016L19.9914 23.8105C20.0941 23.7821 20.1877 23.7276 20.2631 23.6523L23.6495 20.2722C24.3725 19.5492 24.3725 18.3728 23.6495 17.6498ZM19.5048 22.6626L18.2496 23.0102L18.6169 21.8009L20.9067 19.5162L21.781 20.3905L19.5048 22.6626ZM22.7758 19.3977L22.656 19.5172L21.7819 18.6431L21.9012 18.524C22.1422 18.283 22.5344 18.283 22.7754 18.524C23.0164 18.765 23.0164 19.1571 22.7758 19.3977Z"
                  fill={item.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M19.4657 12.4092H13.0991C12.7577 12.4092 12.481 12.6859 12.481 13.0273C12.481 13.3687 12.7577 13.6454 13.0991 13.6454H19.4657C19.8071 13.6454 20.0838 13.3687 20.0838 13.0273C20.0838 12.6859 19.8071 12.4092 19.4657 12.4092Z"
                  fill={item.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
              </svg>
            </span>

            <span
              className="flex justify-center items-center cursor-pointer"
              onClick={() =>
                router.push({
                  pathname: "/leads/details",
                  query: { ...router.query, lead: item?.id },
                })
              }
            >
              <div className="p-[5px] rounded-md w-[27px] h-[27px] border border-primary flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="#4A13E7"
                >
                  <path
                    d="M0.461667 14.0655C0.291259 13.8825 0.206055 13.6659 0.206055 13.4156C0.206055 13.1653 0.291259 12.9489 0.461667 12.7665L5.45463 7.40568L0.444626 2.0266C0.285579 1.85583 0.206055 1.64238 0.206055 1.38623C0.206055 1.13008 0.291259 0.91053 0.461667 0.727568C0.632076 0.544606 0.833839 0.453125 1.06696 0.453125C1.30008 0.453125 1.50161 0.544606 1.67157 0.727568L7.39729 6.89338C7.46545 6.96657 7.51385 7.04585 7.54247 7.13123C7.5711 7.21662 7.58519 7.3081 7.58474 7.40568C7.58474 7.50326 7.57042 7.59474 7.54179 7.68012C7.51316 7.7655 7.465 7.84478 7.39729 7.91797L1.65453 14.0838C1.49548 14.2545 1.29939 14.3399 1.06628 14.3399C0.833157 14.3399 0.631621 14.2485 0.461667 14.0655Z"
                    fill="#4A13E7"
                  />
                </svg>
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
