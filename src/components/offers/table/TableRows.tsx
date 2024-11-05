import React from "react";
import { OffersTableRowTypes } from "@/types/offers";
import { useRouter } from "next/router";
import { formatDateString } from "@/utils/functions";
import { getEmailColor, getOfferStatusColor } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { useTranslation } from "next-i18next";
import { AddNoteIcon } from "@/assets/svgs/components/add-note-icon";
import { AddImageIcon } from "@/assets/svgs/components/add-image-icon";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

export interface OfferTableProps {
  dataToAdd: OffersTableRowTypes[];
  handleNotes: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleImageUpload: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleOfferStatusUpdate: (id: string, status: string, type: string) => void;
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
}

const TableRows = ({
  dataToAdd,
  handleNotes,
  handleImageUpload,
  handleOfferStatusUpdate,
  handlePaymentStatusUpdate,
}: OfferTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const paymentMethod = [
    `${translate("payment_method.Cash")}`,
    `${translate("payment_method.Online")}`,
    `${translate("payment_method.Twint")}`,
  ];

  const itemsValue = [
    `${translate("offer_status.Open")}`,
    `${translate("offer_status.Accepted")}`,
    `${translate("offer_status.Expired")}`,
    `${translate("offer_status.Rejected")}`,
  ];

  return (
    <div
      className={`overflow-y-visible ${
        dataToAdd && dataToAdd.length <= 4 ? "h-[500px]" : ""
      }`}
    >
      {dataToAdd?.map((item, index) => {
        const customerType = item?.leadID?.customerDetail
          ?.customerType as keyof (typeof staticEnums)["CustomerType"];

        const name =
          customerType === 1
            ? item?.leadID?.customerDetail?.companyName
            : item?.leadID?.customerDetail?.fullName;
        const heading =
          customerType === 1
            ? translate("common.company_name")
            : translate("common.customer_name");
        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                onClick={() =>
                  router.push({
                    pathname: `/offers/pdf-preview`,
                    query: { ...router.query, offerID: item?.id, isMail: true },
                  })
                }
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-4 mlg:gap-x-1 xMaxSize:gap-x-3 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(380px,_3fr)_minmax(300px,_4fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(140px,_140px)_minmax(160px,_160px)] mlg:grid-cols-[minmax(70px,_70px),minmax(100px,_3fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] xlg:grid-cols-[minmax(70px,_70px),minmax(100px,_100%)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(100px,_100%)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] xLarge:grid-cols-[minmax(60px,_60px)_minmax(100px,_3fr)_minmax(80px,_4fr)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(115px,_115px)_minmax(140px,_140px)_minmax(135px,_135px)] ${
                  index !== 0 && "border-t border-t-[#E7EAEE]"
                } ${index === 0 && "mt-2"}`}
              >
                <span className="py-4 truncate">{item?.offerNumber}</span>
                <div className="flex items-center gap-x-1">
                  {(item?.leadID?.customerDetail
                    ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                  1 ? (
                    <span className="py-4 truncate text-lg font-medium text-primary">
                      {item?.leadID?.customerDetail?.companyName}
                    </span>
                  ) : (
                    <span className="py-4 truncate">
                      {item?.leadID?.customerDetail?.fullName}
                    </span>
                  )}
                </div>
                <span className="py-4 xs:block mlg:hidden xLarge:block truncate">
                  {item?.content?.contentName}
                </span>
                <span className="py-4 truncate block mlg:hidden xMaxSize:block">
                  {item?.total}
                </span>
                <span className="py-4 mlg:hidden xMaxSize:block truncate">
                  {formatDateString(item?.createdAt)}
                </span>
                <span className="py-4 flex justify-center items-center">
                  <div
                    className={`bg-[${getEmailColor(
                      item.emailStatus
                    )}] text-white px-2 py-2 text-center rounded-md min-w-[70px] w-full text-sm`}
                  >
                    {translate(`email_status.${item?.emailStatus}`)}
                  </div>
                </span>

                <span className="py-4" onClick={(e) => e.stopPropagation()}>
                  <DropDown
                    items={Object.keys(staticEnums["PaymentType"]).map(
                      (item, index) => ({
                        item: {
                          label: paymentMethod[index],
                          value: item,
                        },
                      })
                    )}
                    selectedItem={translate(
                      `payment_method.${item?.paymentType}`
                    )}
                    onItemSelected={(status) => {
                      handlePaymentStatusUpdate(item?.id, status, "offer");
                    }}
                    dropDownClassName={`${
                      staticEnums["PaymentType"][item?.paymentType] === 0
                        ? "bg-[#45C769]"
                        : staticEnums["PaymentType"][item?.paymentType] === 1
                        ? "bg-[#4A13E7]"
                        : "bg-[#FE9244]"
                    } w-full !py-[5px] rounded-lg flex items-center justify-center gap-x-1`}
                    dropDownTextClassName="text-white text-base font-medium"
                    dropDownIconClassName={`text-[#fff]`}
                    dropDownItemsContainerClassName="w-full"
                    isThirdLastIndex={
                      dataToAdd &&
                      dataToAdd.length > 5 &&
                      index === dataToAdd.length - 3
                    }
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
                    isPayment={true}
                  />
                </span>

                {/* <span className="py-4 flex justify-center items-center mx-1">
              <div
                className={`bg-[${getPaymentTypeColor(item.paymentType)}]
                  } text-white px-2 py-1 text-center rounded-md w-full text-sm`}
              >
                {translate(`payment_method.${item.paymentType}`)}
              </div>
            </span> */}

                {/* <span className="py-4 flex justify-center items-center">
              <div
                className={`bg-[${getOfferStatusColor(item.offerStatus)}]
                  } text-white px-2 py-1 text-center rounded-md min-w-[70px] w-full text-sm`}
              >
                {translate(`offer_status.${item.offerStatus}`)}
              </div>
            </span> */}

                {item.offerStatus === "Accepted" ? (
                  <div className="py-4">
                    <div
                      style={{
                        backgroundColor: `${getOfferStatusColor(
                          item.offerStatus
                        )}`,
                      }}
                      className="text-white px-2 py-2 text-center rounded-md min-w-[70px] w-full text-sm"
                    >
                      {translate(`offer_status.${item.offerStatus}`)}
                    </div>
                  </div>
                ) : (
                  <div className="py-4" onClick={(e) => e.stopPropagation()}>
                    <DropDown
                      items={Object.keys(staticEnums["OfferStatus"]).map(
                        (item, index) => ({
                          item: { label: itemsValue[index], value: item },
                        })
                      )}
                      selectedItem={translate(
                        `offer_status.${item.offerStatus}`
                      )}
                      key={item.id}
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
                      } w-full !py-[5px] rounded-lg flex items-center justify-center gap-x-1`}
                      dropDownIconClassName={"text-white"}
                      dropDownTextClassName="text-white text-base font-medium"
                      dropDownItemsContainerClassName="w-full"
                      isThirdLastIndex={
                        dataToAdd &&
                        dataToAdd.length > 5 &&
                        index === dataToAdd.length - 3
                      }
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
                      isOffer={true}
                    />
                  </div>
                )}
              </div>
            </div>

            <div
              className={`grid items-center grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] ${
                index === 0 && "mt-2"
              }`}
            >
              <span
                className="py-3 flex justify-center items-center cursor-pointer"
                onClick={(e) =>
                  handleImageUpload(
                    item?.id,
                    item?.offerNumber,
                    name,
                    heading,
                    e
                  )
                }
                title={translate("offers.table_headings.images")}
              >
                <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <AddImageIcon isImageAdded={item.isImageAdded} />
                </span>
              </span>
              <span
                className="py-3 flex justify-center items-center cursor-pointer"
                onClick={(e) =>
                  handleNotes(item?.id, item?.offerNumber, name, heading, e)
                }
                title={translate("offers.table_headings.note")}
              >
                <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <AddNoteIcon isNoteCreated={item?.isNoteCreated} />
                </span>
              </span>

              <span
                onClick={(e) => e.stopPropagation()}
                title={translate("common.mail")}
                className="py-3 flex justify-center items-center cursor-pointer"
              >
                <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 29 29"
                    fill="none"
                    onClick={() =>
                      router.push({
                        pathname: `/offers/details`,
                        query: { ...router.query, offer: item?.id },
                      })
                    }
                  >
                    <path
                      opacity="1"
                      d="M1.12891 4.34055C1.12891 2.59917 2.54057 1.1875 4.28195 1.1875H24.7768C26.5181 1.1875 27.9298 2.59917 27.9298 4.34055V24.8354C27.9298 26.5767 26.5181 27.9884 24.7768 27.9884H4.28195C2.54057 27.9884 1.12891 26.5767 1.12891 24.8354V4.34055Z"
                      stroke={`${
                        item?.mail?.mailStatus === 0
                          ? "#FE9244"
                          : item?.mail?.mailStatus === 1
                          ? "#45C769"
                          : "#FE9244"
                      }`}
                    />
                    <path
                      d="M14.4499 16.1375C15.3211 16.1375 16.0273 15.4299 16.0273 14.557C16.0273 13.6842 15.3211 12.9766 14.4499 12.9766C13.5788 12.9766 12.8726 13.6842 12.8726 14.557C12.8726 15.4299 13.5788 16.1375 14.4499 16.1375Z"
                      fill={`${
                        item?.mail?.mailStatus === 0
                          ? "#FE9244"
                          : item?.mail?.mailStatus === 1
                          ? "#45C769"
                          : "#FE9244"
                      }`}
                    />
                    <path
                      d="M6.66915 15.0562C7.70759 16.36 10.7966 19.837 14.4508 19.837C18.1051 19.837 21.1941 16.3602 22.2325 15.0562C22.4559 14.7664 22.4559 14.3581 22.2325 14.0817C21.1941 12.7778 18.1051 9.30082 14.4508 9.30082C10.7966 9.28765 7.70759 12.7646 6.66915 14.0685C6.43255 14.3583 6.43255 14.7664 6.66915 15.0562ZM14.4508 11.3949C16.1991 11.3949 17.6056 12.8041 17.6056 14.5558C17.6056 16.3075 16.1991 17.7167 14.4508 17.7167C12.7026 17.7167 11.2961 16.3075 11.2961 14.5558C11.2961 12.8041 12.7026 11.3949 14.4508 11.3949Z"
                      fill={`${
                        item?.mail?.mailStatus === 0
                          ? "#FE9244"
                          : item?.mail?.mailStatus === 1
                          ? "#45C769"
                          : "#FE9244"
                      }`}
                    />
                  </svg>
                </span>
              </span>
              <span
                onClick={(e) => e.stopPropagation()}
                title={translate("offers.table_headings.edit")}
                className="flex justify-center items-center cursor-pointer rounded-md"
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <div
                    onClick={() =>
                      router.push({
                        pathname: `/offers/details`,
                        query: { ...router.query, offer: item?.id },
                      })
                    }
                    className="p-[5px] rounded-md w-[32px] h-[32px] border border-primary flex justify-center items-center"
                  >
                    <EditIcon />
                  </div>
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
