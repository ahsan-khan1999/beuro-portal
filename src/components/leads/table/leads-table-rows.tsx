import React from "react";
import { Lead } from "@/types/leads";
import { useRouter } from "next/router";
import { formatDate, getEmailColor, getPostalCode } from "@/utils/utility";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/hooks/useRedux";
import { AddImageIcon } from "@/assets/svgs/components/add-image-icon";
import { AddNoteIcon } from "@/assets/svgs/components/add-note-icon";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { PdfIcon } from "@/assets/svgs/components/pdf-icon";

export interface LeadTableProps {
  dataToAdd: Lead[];
  handleAddNote: (
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
    e?: React.MouseEvent<HTMLSpanElement>
  ) => void;
  onStatusChange: (id: string, status: string, type: string) => void;
  onShareImages?: (
    id: string,
    refID?: string,
    name?: string,
    heading?: string
  ) => void;
  onAppointment: () => void;
  isAgent?: boolean;
}

export const LeadsTableRows = ({
  dataToAdd,
  handleAddNote,
  handleImageUpload,
  onStatusChange,
  isAgent,
}: LeadTableProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const itemsValue = [
    `${translate("leads.lead_dropdown_status.Open")}`,
    `${translate("leads.lead_dropdown_status.InProcess")}`,
    `${translate("leads.lead_dropdown_status.Close")}`,
    `${translate("leads.lead_dropdown_status.Expired")}`,
  ];

  const items = Object.keys(staticEnums["LeadStatus"]).map((item, index) => ({
    item: { label: itemsValue[index], value: item },
  }));

  const handleReportPDF = (item: any) => {
    router.push({
      pathname: isAgent ? "/agent/appointments/pdf" : "/appointments/pdf",
      query: {
        ...router.query,
        reportId: item?.appointment?.id,
        ...(isAgent ? { isLead: true } : { isCompanyLead: true }),
      },
    });
  };

  return (
    <div
      className={`overflow-y-visible ${
        !isAgent && dataToAdd && dataToAdd.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {dataToAdd?.map((item: Lead, index: number) => {
        const customerType = item?.customerDetail
          ?.customerType as keyof (typeof staticEnums)["CustomerType"];
        const name =
          customerType === 1
            ? item?.customerDetail?.companyName
            : item?.customerDetail?.fullName;
        const heading =
          customerType === 1
            ? translate("common.company_name")
            : translate("common.customer_name");

        return (
          <div>
            {isAgent ? (
              <>
                <div className="mlg:hidden">
                  <div
                    onClick={() => {
                      router.push({
                        pathname: isAgent
                          ? "/agent/leads/details"
                          : "/leads/details",
                        query: { ...router.query, lead: item?.id },
                      });
                    }}
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                    } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-1 grid xs:grid-cols-[minmax(65px,_65px)_minmax(80px,100%)_minmax(100px,100%)_minmax(170px,_170px)] xAir:grid-cols-[minmax(65px,_65px)_minmax(80px,100%)_minmax(100px,100%)_minmax(170px,_170px)] ${
                      index !== 0 && "border-t border-t-[#E7EAEE]"
                    } ${index === 0 && "mt-2"}`}
                  >
                    <span className="py-4 truncate">{item?.refID}</span>
                    <span className="py-4 truncate">
                      {item?.customerDetail?.fullName}
                    </span>
                    <span className="py-4 truncate">
                      {item?.customerDetail?.email}
                    </span>

                    <div className={`py-4`}>
                      <div
                        className={`px-[10px] py-2 w-full rounded-lg text-white text-sm font-medium text-center ${
                          item?.isAppointmentCreated
                            ? "bg-primary"
                            : "bg-[#FB9600]"
                        }`}
                      >
                        {item?.isAppointmentCreated
                          ? translate("leads.created")
                          : translate("leads.not_created")}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div
              className={`${isAgent ? "hidden mlg:flex" : "flex"}`}
              key={index}
            >
              <div className="mlg:w-full">
                {user?.company?.isAppointment ? (
                  <div
                    onClick={() => {
                      router.push({
                        pathname: isAgent
                          ? "/agent/leads/details"
                          : "/leads/details",
                        query: { ...router.query, lead: item?.id },
                      });
                    }}
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                    } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-2 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(220px,4fr)_minmax(300px,_3fr)_minmax(200px,200px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(180px,_180px)_minmax(170px,_170px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(115px,_115px)_minmax(170px,_170px)_minmax(170px,_170px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(115px,_115px)_minmax(170px,_170px)_minmax(170px,_170px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_3fr)_minmax(115px,_115px)_minmax(170px,_170px)_minmax(170px,_170px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(140px,_140px)_minmax(115px,_115px)_minmax(170px,_170px)_minmax(170px,_170px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(115px,_115px)_minmax(170px,_170px)_minmax(170px,_170px)] maxLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(120px,_120px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(115px,_115px)_minmax(170px,_170px)_minmax(170px,_170px)] ${
                      index !== 0 && "border-t border-t-[#E7EAEE]"
                    } ${index === 0 && "mt-2"}`}
                  >
                    <span className="py-4 truncate">{item?.refID}</span>
                    <div className="flex items-center gap-x-1">
                      {(item?.customerDetail
                        ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                      1 ? (
                        <span className="py-4 truncate text-lg font-medium text-primary">
                          {item?.customerDetail?.companyName}
                        </span>
                      ) : (
                        <span className="py-4 truncate">
                          {item?.customerDetail?.fullName}
                        </span>
                      )}
                    </div>
                    <span className="py-4 truncate block mlg:hidden">
                      {item?.customerDetail?.email}
                    </span>
                    <span className="py-4 truncate mlg:hidden maxLarge:block">
                      {item?.customerDetail?.phoneNumber}
                    </span>
                    <span className="py-4 flex items-center mlg:hidden xMaxSize:flex">
                      {formatDate(item.createdAt)}
                    </span>
                    <span className="py-4 truncate mlg:hidden xLarge:block">
                      {getPostalCode(item?.customerDetail?.address?.postalCode)}
                    </span>
                    {item.emailStatus && (
                      <div className="py-4 flex justify-center items-center">
                        <span
                          className={`bg-[${getEmailColor(
                            item.emailStatus
                          )}] text-white px-2 py-2 text-center rounded-md min-w-[70px] w-full text-sm`}
                        >
                          {translate(`email_status.${item?.emailStatus}`)}
                        </span>
                      </div>
                    )}

                    {isAgent ? (
                      <div className={`py-4`}>
                        <div
                          className={`px-[10px] py-2 w-full rounded-lg ${
                            item?.leadStatus === "InProcess"
                              ? "text-dark"
                              : "text-white"
                          } text-sm font-medium text-center ${
                            item?.leadStatus === "Open"
                              ? "bg-[#4A13E7]"
                              : item?.leadStatus === "InProcess"
                              ? "bg-[#f5d60f]"
                              : item?.leadStatus === "Close"
                              ? "bg-[#45C769]"
                              : "bg-[#FF0000]"
                          }`}
                        >
                          {translate(
                            `leads.lead_dropdown_status.${item?.leadStatus}`
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
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
                          dropDownClassName={`${
                            item?.leadStatus === "Open"
                              ? "bg-[#4A13E7]"
                              : item?.leadStatus === "InProcess"
                              ? "bg-[#f5d60f]"
                              : item?.leadStatus === "Close"
                              ? "bg-[#45C769]"
                              : "bg-[#FF0000]"
                          } w-full rounded-lg px-4 py-[5px] flex items-center justify-center`}
                          dropDownTextClassName={`${
                            item?.leadStatus === "InProcess"
                              ? "text-black"
                              : "text-white"
                          } text-base font-medium me-1`}
                          dropDownItemsContainerClassName="w-full"
                          dropDownIconClassName={`${
                            item?.leadStatus === "InProcess"
                              ? "text-black"
                              : "text-white"
                          }`}
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
                          isLead={true}
                        />
                      </div>
                    )}

                    <div className={`py-4`}>
                      <div
                        className={`px-[10px] py-2 w-full rounded-lg text-white text-sm font-medium text-center ${
                          item?.isAppointmentCreated
                            ? "bg-primary"
                            : "bg-[#FB9600]"
                        }`}
                      >
                        {item?.isAppointmentCreated
                          ? translate("leads.created")
                          : translate("leads.not_created")}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      router.push({
                        pathname: isAgent
                          ? "/agent/leads/details"
                          : "/leads/details",
                        query: { ...router.query, lead: item?.id },
                      });
                    }}
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                    } ${index !== 0 && "border-t border-t-[#E7EAEE]"} ${
                      index === 0 && "mt-2"
                    } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-2 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(250px,4fr)_minmax(300px,_3fr)_minmax(200px,200px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(180px,_180px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(170px,_170px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(150px,_150px)_minmax(170px,_170px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_3fr)_minmax(100px,_4fr)_minmax(150px,_150px)_minmax(170px,_170px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(150px,_150px)_minmax(170px,_170px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(170px,_170px)] maxLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(170px,_170px)]`}
                  >
                    <span className="py-4 truncate">{item?.refID}</span>
                    <div className="flex items-center gap-x-1">
                      {(item?.customerDetail
                        ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                      1 ? (
                        <span className="py-4 truncate text-lg font-medium text-primary">
                          {item?.customerDetail?.companyName}
                        </span>
                      ) : (
                        <span className="py-4 truncate">
                          {item?.customerDetail?.fullName}
                        </span>
                      )}
                    </div>
                    <span className="py-4 truncate block mlg:hidden maxSize:block">
                      {item?.customerDetail?.email}
                    </span>
                    <span className="py-4 truncate mlg:hidden maxLarge:block">
                      {item?.customerDetail?.phoneNumber}
                    </span>
                    <span className="py-4 flex items-center mlg:hidden xlg:flex">
                      {formatDate(item.createdAt)}
                    </span>
                    <span className="py-4 truncate mlg:hidden xLarge:block">
                      {item?.customerDetail?.address?.country}
                    </span>

                    {isAgent ? (
                      <div className={`py-4`}>
                        <div
                          className={`px-[10px] py-2 w-full rounded-lg ${
                            item?.leadStatus === "InProcess"
                              ? "text-dark"
                              : "text-white"
                          } text-sm font-medium text-center ${
                            item?.leadStatus === "Open"
                              ? "bg-[#4A13E7]"
                              : item?.leadStatus === "InProcess"
                              ? "bg-[#f5d60f]"
                              : item?.leadStatus === "Close"
                              ? "bg-[#45C769]"
                              : "bg-[#FF0000]"
                          }`}
                        >
                          {translate(
                            `leads.lead_dropdown_status.${item?.leadStatus}`
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
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
                          dropDownClassName={`${
                            item?.leadStatus === "Open"
                              ? "bg-[#4A13E7]"
                              : item?.leadStatus === "InProcess"
                              ? "bg-[#f5d60f]"
                              : item?.leadStatus === "Close"
                              ? "bg-[#45C769]"
                              : "bg-[#FF0000]"
                          } w-full rounded-lg px-4 py-[3px] flex items-center justify-center`}
                          dropDownTextClassName={`${
                            item?.leadStatus === "InProcess"
                              ? "text-black"
                              : "text-white"
                          } text-base font-medium me-1`}
                          dropDownItemsContainerClassName="w-full"
                          dropDownIconClassName={`${
                            item?.leadStatus === "InProcess"
                              ? "text-black"
                              : "text-white"
                          }`}
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
                          isLead={true}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div
                className={`grid items-center grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] ${
                  index === 0 && "mt-2"
                }`}
              >
                {item?.appointment?.isReportSubmitted ? (
                  <div
                    className="py-3 flex justify-center items-center cursor-pointer"
                    onClick={() => handleReportPDF(item)}
                    title={translate("contracts.table_headings.pdf")}
                  >
                    <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                      <PdfIcon pathClass="#45C769" />
                    </span>
                  </div>
                ) : (
                  <span className="py-4 flex justify-center items-center">
                    -
                  </span>
                )}
                <div
                  className="py-3 flex justify-center items-center cursor-pointer"
                  onClick={(e) =>
                    handleImageUpload(
                      item?.id,
                      item?.refID,
                      name,
                      heading,
                      e as React.MouseEvent<HTMLSpanElement>
                    )
                  }
                  title={translate("leads.table_headings.images")}
                >
                  <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                    <AddImageIcon isImageAdded={item.isImageAdded} />
                  </span>
                </div>

                <div
                  className="py-3 flex justify-center items-center cursor-pointer"
                  onClick={(e) =>
                    handleAddNote(item?.id, item?.refID, name, heading, e)
                  }
                  title={translate("leads.table_headings.note")}
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
                </div>

                <span
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    router.push({
                      pathname: isAgent
                        ? "/agent/leads/details"
                        : "/leads/details",
                      query: { ...router.query, lead: item?.id },
                    })
                  }
                  title={translate("leads.table_headings.edit")}
                >
                  <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                    <div className="p-[5px] rounded-md w-[32px] h-[32px] border border-primary flex justify-center items-center">
                      <EditIcon />
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
