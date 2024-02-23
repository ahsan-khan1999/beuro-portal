import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { useRouter } from "next/router";
import { formatDateString } from "@/utils/functions";
import {
  getEmailColor,
  getMailStatusColor,
  getOfferStatusColor,
  getPaymentTypeColor,
} from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { SelectDropDown } from "@/base-components/ui/selectDropDown/select-drop-down";

const TableRows = ({
  dataToAdd,
  openModal,
  handleImageUpload,
  handleOfferStatusUpdate,
  handlePaymentStatusUpdate,
}: {
  dataToAdd: OffersTableRowTypes[];
  openModal: (item: string, e: React.MouseEvent<HTMLSpanElement>) => void;
  handleImageUpload: (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleOfferStatusUpdate: (id: string, status: string, type: string) => void;
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const paymentMethod = [
    `${translate("payment_method.Cash")}`,
    `${translate("payment_method.Online")}`,
  ];

  const itemsValue = [
    `${translate("offer_status.Open")}`,
    `${translate("offer_status.Accepted")}`,
    `${translate("offer_status.Expired")}`,
    `${translate("offer_status.Rejected")}`,
  ];

  return (
    <div>
      {dataToAdd?.map((item, index) => {
        return (
          <div
            onClick={() =>
              router.push(
                `/offers/pdf-preview?offerID=${item?.id}&isMail=${true}`
              )
            }
            key={index}
            className="cursor-pointer items-center hover:bg-[#E9E1FF] bg-white px-6 shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(250px,_4fr)_minmax(300px,_3fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(160px,_160px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(70px,_70px),minmax(60px,_3fr)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(140px,_140px)_minmax(70px,_70px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] xlg:grid-cols-[minmax(70px,_70px),minmax(60px,_100%)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(85px,_85px)_minmax(140px,_140px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(70px,_100%)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(140px,_140px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(140px,_140px)_minmax(80px,_80px)_minmax(80px,_80px)_minmax(60px,_60px)_minmax(90px,_90px)] xLarge:grid-cols-[minmax(70px,_70px)_minmax(100px,_4fr)_minmax(120px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(140px,_140px)_minmax(80px,_80px)_minmax(70px,_70px)_minmax(60px,_60px)_minmax(90px,_90px)] mt-2 rounded-md"
          >
            <span className="py-4 truncate">{item.offerNumber}</span>
            <span className="py-4 truncate">
              {item.leadID?.customerDetail?.fullName}
            </span>
            <span className="mr-1 py-4 xs:block mlg:hidden xlg:hidden maxSize:hidden xMaxSize:block truncate">
              {item?.title}
            </span>
            <span className="py-4 truncate mlg:hidden xlg:block">
              {item.total}
            </span>
            <span className="py-4 mlg:hidden xLarge:block truncate">
              {formatDateString(item.createdAt)}
            </span>
            <span className="py-4 flex justify-center items-center">
              <div
                className={`bg-[${getEmailColor(
                  item.emailStatus
                )}] text-white px-2 py-1 text-center rounded-md min-w-[70px] text-sm`}
              >
                {translate(`email_status.${item?.emailStatus}`)}
              </div>
            </span>

            <span className="py-4 ml-1" onClick={(e) => e.stopPropagation()}>
              {/* <DropDown
                items={Object.keys(staticEnums["PaymentType"]).map(
                  (item, index) => ({
                    item: {
                      label: paymentMethod[index],
                      value: item,
                    },
                  })
                )}
                selectedItem={translate(`payment_method.${item.paymentType}`)}
                onItemSelected={(status) => {
                  handlePaymentStatusUpdate(item.id, status, "offer");
                }}
                dropDownClassName={`${
                  staticEnums["PaymentType"][item.paymentType] === 0
                    ? "bg-[#45C769]"
                    : "bg-[#4A13E7]"
                } min-w-[68.82px] rounded-lg px-1 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={`text-[#fff]`}
                dropDownItemsContainerClassName="min-w-[68.82px] w-full text-center"
              /> */}

              <SelectDropDown
                items={Object.keys(staticEnums["PaymentType"]).map(
                  (item, index) => ({
                    item: {
                      label: paymentMethod[index],
                      value: item,
                    },
                  })
                )}
                selectedItem={translate(`payment_method.${item.paymentType}`)}
                onItemSelected={(status) => {
                  handlePaymentStatusUpdate(item.id, status, "offer");
                }}
                dropDownClassName={`${
                  staticEnums["PaymentType"][item.paymentType] === 0
                    ? "bg-[#45C769]"
                    : "bg-[#4A13E7]"
                } w-full rounded-lg py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={`text-[#fff]`}
                dropDownItemsContainerClassName="min-w-[68.82px] w-full text-center"
              />
            </span>

            {/* <span className="py-4 flex justify-center items-center">
              <div
                className={`bg-[${getPaymentTypeColor(item.paymentType)}]
                  } text-white px-2 py-1 text-center rounded-md min-w-[70px] text-sm`}
              >
                {translate(`payment_method.${item.paymentType}`)}
              </div>
            </span> */}
            {item.offerStatus === "Accepted" ? (
              <span className="py-4 ml-1">
                <div
                  style={{
                    backgroundColor: `${getOfferStatusColor(item.offerStatus)}`,
                  }}
                  className="text-white px-2 py-1 text-center rounded-md min-w-[70px] w-fit text-sm"
                >
                  {translate(`offer_status.${item.offerStatus}`)}
                </div>
              </span>
            ) : (
              <div className="py-4 ml-1" onClick={(e) => e.stopPropagation()}>
                <SelectDropDown
                  items={Object.keys(staticEnums["OfferStatus"]).map(
                    (item, index) => ({
                      item: { label: itemsValue[index], value: item },
                    })
                  )}
                  selectedItem={translate(`offer_status.${item.offerStatus}`)}
                  onItemSelected={(status) => {
                    handleOfferStatusUpdate(item.id, status, "offer");
                  }}
                  dropDownClassName={`${
                    staticEnums["OfferStatus"][item.offerStatus] === 0
                      ? "bg-[#4A13E7]"
                      : staticEnums["OfferStatus"][item.offerStatus] === 1
                      ? "bg-[#45C769]"
                      : staticEnums["OfferStatus"][item.offerStatus] === 2
                      ? "bg-[#FF376F]"
                      : "bg-[#FF0000]"
                  } w-full rounded-lg py-[3px] flex items-center justify-center`}
                  dropDownTextClassName="text-white text-base font-medium pe-2"
                  key={item.id}
                  dropDownIconClassName={`text-[#fff]`}
                  dropDownItemsContainerClassName="min-w-[90px] w-full text-center"
                />
              </div>

              // <span className="py-4 flex justify-center items-center">
              //   <div
              //     style={{
              //       backgroundColor: `${getOfferStatusColor(item.offerStatus)}`,
              //     }}
              //     className="text-white px-2 py-1 text-center rounded-md min-w-[70px] w-fit text-sm"
              //   >
              //     {translate(`offer_status.${item.offerStatus}`)}
              //   </div>
              // </span>
            )}

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
                  stroke="#4A13E7"
                />
                <path
                  d="M15.4044 22.0518H12.1297C11.1072 22.0518 10.2753 21.2199 10.2753 20.1974V11.7908C10.2753 10.7683 11.1072 9.93645 12.1297 9.93645H20.5362C21.5588 9.93645 22.3906 10.7683 22.3906 11.7908V15.1624C22.3906 15.5038 22.6674 15.7805 23.0088 15.7805C23.3501 15.7805 23.6269 15.5038 23.6269 15.1624V11.7908C23.6269 10.0867 22.2405 8.7002 20.5362 8.7002H12.1297C10.4255 8.7002 9.03906 10.0867 9.03906 11.7908V20.1974C9.03906 21.9016 10.4255 23.288 12.1297 23.288H15.4044C15.7458 23.288 16.0225 23.0113 16.0225 22.6699C16.0225 22.3285 15.7458 22.0518 15.4044 22.0518Z"
                  fill="#4A13E7"
                />
                <path
                  d="M24.3194 17.3499C23.5963 16.6269 22.4199 16.6269 21.6969 17.3499L18.5623 20.4845C17.6484 21.3984 17.145 22.6136 17.145 23.9061C17.145 24.2475 17.4218 24.5243 17.7631 24.5243C19.0557 24.5243 20.2709 24.0209 21.1849 23.1069L24.3194 19.9724C25.0424 19.2494 25.0424 18.0729 24.3194 17.3499ZM23.4452 18.224C23.6863 18.4651 23.6863 18.8572 23.4452 19.0982L23.0081 19.5353L22.134 18.6611L22.5711 18.224C22.8121 17.983 23.2043 17.983 23.4452 18.224ZM20.3107 22.2328C19.7939 22.7495 19.1478 23.09 18.4454 23.2239C18.5793 22.5215 18.9198 21.8754 19.4365 21.3586L21.2598 19.5353L22.134 20.4095L20.3107 22.2328Z"
                  fill="#4A13E7"
                />
                <path
                  d="M13.2906 14.7004L11.6923 16.2988C11.4509 16.5402 11.4509 16.9316 11.6923 17.173C11.9337 17.4144 12.3251 17.4144 12.5665 17.173L14.1648 15.5746C14.4058 15.3336 14.7979 15.3336 15.0389 15.5746L18.192 18.7277C18.4334 18.9691 18.8248 18.9691 19.0662 18.7277C19.3075 18.4863 19.3075 18.0949 19.0662 17.8535L15.9131 14.7004C15.1901 13.9775 14.0137 13.9775 13.2906 14.7004Z"
                  fill="#4A13E7"
                />
                <path
                  d="M19.3026 14.8806C18.2801 14.8806 17.4482 14.0488 17.4482 13.0263C17.4482 12.0038 18.2801 11.1719 19.3026 11.1719C20.3251 11.1719 21.157 12.0038 21.157 13.0263C21.157 14.0488 20.3251 14.8806 19.3026 14.8806ZM19.3026 12.4081C18.9618 12.4081 18.6845 12.6854 18.6845 13.0263C18.6845 13.3671 18.9618 13.6444 19.3026 13.6444C19.6435 13.6444 19.9208 13.3671 19.9208 13.0263C19.9208 12.6854 19.6435 12.4081 19.3026 12.4081Z"
                  fill="#4A13E7"
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

            <span className="py-4 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  opacity="1"
                  d="M1.12891 4.34055C1.12891 2.59917 2.54057 1.1875 4.28195 1.1875H24.7768C26.5181 1.1875 27.9298 2.59917 27.9298 4.34055V24.8354C27.9298 26.5767 26.5181 27.9884 24.7768 27.9884H4.28195C2.54057 27.9884 1.12891 26.5767 1.12891 24.8354V4.34055Z"
                  stroke={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                />
                <path
                  d="M14.4499 16.1375C15.3211 16.1375 16.0273 15.4299 16.0273 14.557C16.0273 13.6842 15.3211 12.9766 14.4499 12.9766C13.5788 12.9766 12.8726 13.6842 12.8726 14.557C12.8726 15.4299 13.5788 16.1375 14.4499 16.1375Z"
                  fill={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                />
                <path
                  d="M6.66915 15.0562C7.70759 16.36 10.7966 19.837 14.4508 19.837C18.1051 19.837 21.1941 16.3602 22.2325 15.0562C22.4559 14.7664 22.4559 14.3581 22.2325 14.0817C21.1941 12.7778 18.1051 9.30082 14.4508 9.30082C10.7966 9.28765 7.70759 12.7646 6.66915 14.0685C6.43255 14.3583 6.43255 14.7664 6.66915 15.0562ZM14.4508 11.3949C16.1991 11.3949 17.6056 12.8041 17.6056 14.5558C17.6056 16.3075 16.1991 17.7167 14.4508 17.7167C12.7026 17.7167 11.2961 16.3075 11.2961 14.5558C11.2961 12.8041 12.7026 11.3949 14.4508 11.3949Z"
                  fill={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                />
              </svg>
            </span>
            <span
              className="flex justify-center items-center cursor-pointer rounded-md"
              onClick={() =>
                router.push(
                  `/offers/pdf-preview?offerID=${item?.id}&isMail=${true}`
                )
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
