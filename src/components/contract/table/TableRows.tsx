import { contractTableTypes } from "@/types/contract";
import React from "react";
import { useRouter } from "next/router";
import { getEmailColor } from "@/utils/utility";
import { PdfIcon } from "@/assets/svgs/components/pdf-icon";
import { staticEnums } from "@/utils/static";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { useTranslation } from "next-i18next";
import { AddImageIcon } from "@/assets/svgs/components/add-image-icon";
import { AddNoteIcon } from "@/assets/svgs/components/add-note-icon";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

export interface ContractTableProps {
  dataToAdd: contractTableTypes[];
  handleNotes: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleImageUpload: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleContractStatusUpdate: (
    id: string,
    status: string,
    type: string
  ) => void;
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
  onTaskCreate: (id: string) => void;
}

const TableRows = ({
  dataToAdd,
  handleNotes,
  handleImageUpload,
  handleContractStatusUpdate,
  handlePaymentStatusUpdate,
  onTaskCreate,
}: ContractTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const colorPicker = {
    [staticEnums.ContractSignedStatus.Deprecated]: "#FF0000",
    [staticEnums.ContractSignedStatus.Active]: "#45C769",
  };

  const paymentMethod = [
    `${translate("payment_method.Cash")}`,
    `${translate("payment_method.Online")}`,
    `${translate("payment_method.Twint")}`,
  ];

  const contractStatus = [
    `${translate("contract_status.Open")}`,
    `${translate("contract_status.Confirmed")}`,
    `${translate("contract_status.Cancelled")}`,
  ];

  return (
    <div
      className={`overflow-y-visible ${
        dataToAdd && dataToAdd.length <= 4 ? "h-[500px]" : ""
      }`}
    >
      {dataToAdd?.map((item, index: number) => {
        const customerType = item?.offerID?.leadID?.customerDetail
          ?.customerType as keyof (typeof staticEnums)["CustomerType"];
        const name =
          customerType === 1
            ? item?.offerID?.leadID?.customerDetail?.companyName
            : item?.offerID?.leadID?.customerDetail?.fullName;

        const heading =
          customerType === 1
            ? translate("common.company_name")
            : translate("common.customer_name");

        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                key={index}
                onClick={() =>
                  router.push({
                    pathname: `/contract/pdf-preview`,
                    query: { ...router.query, offerID: item?.id, isMail: true },
                  })
                }
                className={`${
                  item?.isTaskCreated === true
                    ? "bg-[#cbfde1]"
                    : item?.isTaskCreated === false
                    ? "bg-[#FFE3E3]"
                    : "bg-[#fff]"
                } mb-1 pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-5 mlg:gap-x-1 xMaxSize:gap-x-4 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(400px,_4fr)_minmax(300px,_3fr)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(140px,_140px)_minmax(150px,_150px)] mlg:grid-cols-[minmax(65px,_65px),minmax(90px,_3fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] xlg:grid-cols-[minmax(65px,_65px),minmax(110px,_3fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_3fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(150px,_150px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_4fr)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] xLarge:grid-cols-[minmax(65px,_65px)_minmax(80px,_3fr)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] maxLarge:grid-cols-[minmax(65px,_65px)_minmax(100px,_3fr)_minmax(80px,_4fr)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(140px,_140px)_minmax(140px,_140px)] ${
                  index !== 0 && "border-t border-t-[#E7EAEE]"
                } ${index === 0 && "mt-2"}`}
              >
                <span className="py-4 truncate">{item.contractNumber}</span>
                <div className="flex items-center gap-x-1">
                  {(item?.offerID?.leadID?.customerDetail
                    ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                  1 ? (
                    <span className="py-4 truncate text-lg font-medium text-primary">
                      {item?.offerID?.leadID?.customerDetail?.companyName}
                    </span>
                  ) : (
                    <span className="py-4 truncate">
                      {item?.offerID?.leadID?.customerDetail?.fullName}
                    </span>
                  )}
                </div>
                <span className="truncate mlg:hidden maxLarge:block py-4">
                  {item?.offerID?.content?.contentName}
                </span>
                <span className="py-4 truncate mlg:hidden xLarge:block">
                  {item?.offerID?.total}
                </span>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="py-4 mlg:hidden xLarge:block"
                >
                  {item?.isTaskCreated ? (
                    <p className="bg-[#45C769] text-white px-2 py-[6px] text-center rounded-md w-full cursor-default">
                      {translate("common.added")}
                    </p>
                  ) : (
                    <p
                      className="bg-primary hover:bg-buttonHover text-white px-2 py-[6px] text-center rounded-md w-full"
                      onClick={() => {
                        onTaskCreate(item?.id);
                      }}
                    >
                      {translate("common.add")}
                    </p>
                  )}
                </div>
                <span className="flex justify-center items-center cursor-default">
                  <div
                    className={`bg-[${getEmailColor(
                      item?.emailStatus
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
                      handlePaymentStatusUpdate(item?.id, status, "contracts");
                    }}
                    dropDownClassName={`${
                      staticEnums["PaymentType"][item?.paymentType] === 0
                        ? "bg-[#45C769]"
                        : staticEnums["PaymentType"][item?.paymentType] === 1
                        ? "bg-[#4A13E7]"
                        : "bg-[#FE9244]"
                    } w-full rounded-lg !py-[5px] flex items-center justify-center gap-x-1`}
                    dropDownTextClassName="text-white text-base font-medium"
                    dropDownIconClassName={`text-[#fff]`}
                    dropDownItemsContainerClassName="w-full"
                    isSecondLastIndex={
                      dataToAdd &&
                      dataToAdd?.length > 5 &&
                      index === dataToAdd?.length - 2
                    }
                    isLastIndex={
                      dataToAdd &&
                      dataToAdd?.length > 5 &&
                      index === dataToAdd?.length - 1
                    }
                    isPayment={true}
                  />
                </span>
                {/* <span className="py-4 flex justify-center items-center mr-1">
              <div
                className={`bg-[${getPaymentTypeColor(item.paymentType)}]
                  } text-white px-2 py-1 text-center rounded-md w-full text-sm`}
              >
                {translate(`payment_method.${item.paymentType}`)}
              </div>
            </span> */}

                <span className="py-4" onClick={(e) => e.stopPropagation()}>
                  <DropDown
                    items={Object.keys(staticEnums["ContractStatus"]).map(
                      (item, index) => ({
                        item: {
                          label: contractStatus[index],
                          value: item,
                        },
                      })
                    )}
                    selectedItem={translate(
                      `contract_status.${item.contractStatus}`
                    )}
                    onItemSelected={(status) => {
                      if (item.contractStatus !== status) {
                        handleContractStatusUpdate(
                          item.id,
                          status,
                          "contracts"
                        );
                      }
                    }}
                    dropDownClassName={`${
                      staticEnums["ContractStatus"][item.contractStatus] === 0
                        ? "bg-[#4A13E7]"
                        : staticEnums["ContractStatus"][item.contractStatus] ===
                          1
                        ? "bg-[#45C769]"
                        : "bg-[#FF0000]"
                    } w-full !py-[5px] rounded-lg flex items-center justify-center gap-x-1
                `}
                    dropDownTextClassName="text-white text-base font-medium"
                    dropDownIconClassName={`text-[#fff]`}
                    dropDownItemsContainerClassName="w-full"
                    isSecondLastIndex={
                      dataToAdd &&
                      dataToAdd?.length > 5 &&
                      index === dataToAdd?.length - 2
                    }
                    isLastIndex={
                      dataToAdd &&
                      dataToAdd?.length > 5 &&
                      index === dataToAdd?.length - 1
                    }
                    isContract={true}
                  />
                </span>

                {/* <span className="flex justify-center items-center">
              <div
                className={`bg-[${getContractStatusColor(item.contractStatus)}]
                  } text-white px-2 py-1 text-center rounded-md text-sm min-w-[90px] w-full`}
              >
                {translate(`contract_status.${item.contractStatus}`)}
              </div>
            </span> */}
              </div>
            </div>

            <div
              className={`grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] ${
                index === 0 && "mt-2"
              }`}
            >
              <div
                className="py-3 flex justify-center items-center cursor-pointer"
                onClick={(e) =>
                  handleImageUpload(
                    item?.id,
                    item?.contractNumber,
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
              </div>
              {(item.signedContracts && item.signedContracts?.length > 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    item.signedContracts &&
                      window.open(
                        item.signedContracts?.[
                          item?.signedContracts?.length - 1
                        ]?.link
                      );
                  }}
                  title={translate("contracts.table_headings.pdf")}
                  className="py-3 flex justify-center items-center cursor-pointer"
                >
                  <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                    <PdfIcon
                      pathClass={
                        colorPicker[
                          item?.signedContracts?.[
                            item?.signedContracts?.length - 1
                          ]?.status
                        ]
                      }
                    />
                  </span>
                </span>
              )) || (
                <span className="py-4 flex justify-center items-center cursor-pointer">
                  -
                </span>
              )}

              <div
                onClick={(e) =>
                  handleNotes(item?.id, item?.contractNumber, name, heading, e)
                }
                title={translate("contracts.table_headings.notes")}
                className="py-3 flex justify-center items-center cursor-pointer"
              >
                <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <AddNoteIcon isNoteCreated={item?.isNoteCreated} />
                </span>
              </div>
              <div
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
                        pathname: "/contract/details",
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
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                title={translate("contracts.table_headings.edit")}
                className="flex justify-center items-center cursor-pointer"
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <div
                    onClick={() =>
                      router.push({
                        pathname: "/contract/details",
                        query: { ...router.query, offer: item?.id },
                      })
                    }
                    className="p-[5px] rounded-md w-[32px] h-[32px] border border-primary flex justify-center items-center"
                  >
                    <EditIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
