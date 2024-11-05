import React from "react";
import { Lead } from "@/types/leads";
import { useRouter } from "next/router";
import { formatDate, getPostalCode } from "@/utils/utility";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/hooks/useRedux";
import { AddImageIcon } from "@/assets/svgs/components/add-image-icon";
import { AddNoteIcon } from "@/assets/svgs/components/add-note-icon";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

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

        const handleReportPDF = () => {
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
                    } pl-4 pr-1 cursor-pointer rounded-md items-center hover:bg-[#E9E1FF] gap-x-2 xs:w-fit mlg:w-full grid xs:grid-cols-[minmax(80px,_80px),minmax(220px,4fr)_minmax(300px,_3fr)_minmax(200px,200px)_minmax(160px,_160px)_minmax(120px,_120px)_minmax(180px,_180px)_minmax(170px,_170px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(170px,_170px)_minmax(170px,_170px)] xlg:grid-cols-[minmax(70px,_70px)_minmax(80px,_3fr)_minmax(150px,_150px)_minmax(170px,_170px)_minmax(170px,_170px)] maxSize:grid-cols-[minmax(70px,_70px)_minmax(70px,_3fr)_minmax(100px,_4fr)_minmax(150px,_150px)_minmax(170px,_170px)_minmax(170px,_170px)] xMaxSize:grid-cols-[minmax(70px,_70px)_minmax(100px,_100%)_minmax(110px,_110px)_minmax(150px,_150px)_minmax(170px,_170px)_minmax(170px,_170px)] xLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(170px,_170px)] maxLarge:grid-cols-[minmax(70px,_70px),minmax(60px,4fr)_minmax(70px,_3fr)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(_170px,_170px)] ${
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
                      {getPostalCode(item?.customerDetail?.address?.postalCode)}
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
                className={`grid items-center grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)_minmax(50px,_50px)] ${
                  index === 0 && "mt-2"
                }`}
              >
                {item?.appointment?.isReportSubmitted ? (
                  <div
                    className="py-3 flex justify-center items-center cursor-pointer"
                    onClick={handleReportPDF}
                    title={translate("contracts.table_headings.pdf")}
                  >
                    <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                      >
                        <rect
                          x="0.668457"
                          y="0.860107"
                          width="31.4496"
                          height="31.2797"
                          rx="7.5"
                          fill="white"
                          stroke="#45C769"
                        />
                        <path
                          d="M20.2065 19.4106H19.2457C18.892 19.4106 18.6052 19.6974 18.6052 20.0512V23.8942C18.6052 24.2479 18.892 24.5347 19.2457 24.5347H20.2065C21.266 24.5347 22.128 23.6727 22.128 22.6132V21.3322C22.128 20.2726 21.266 19.4106 20.2065 19.4106ZM20.847 22.6132C20.847 22.9664 20.5597 23.2537 20.2065 23.2537H19.8862V20.6917H20.2065C20.5597 20.6917 20.847 20.979 20.847 21.3322V22.6132Z"
                          fill="#45C769"
                        />
                        <path
                          d="M25.333 19.4106H23.4115C23.0578 19.4106 22.771 19.6974 22.771 20.0512V23.8942C22.771 24.2479 23.0578 24.5347 23.4115 24.5347C23.7653 24.5347 24.052 24.2479 24.052 23.8942V22.6132H24.6925C25.0463 22.6132 25.333 22.3264 25.333 21.9727C25.333 21.6189 25.0463 21.3322 24.6925 21.3322H24.052V20.6917H25.333C25.6868 20.6917 25.9735 20.4049 25.9735 20.0512C25.9735 19.6974 25.6868 19.4106 25.333 19.4106Z"
                          fill="#45C769"
                        />
                        <path
                          d="M16.3656 19.4106H15.0846C14.7308 19.4106 14.4441 19.6974 14.4441 20.0512V23.8942C14.4441 24.2479 14.7308 24.5347 15.0846 24.5347C15.4384 24.5347 15.7251 24.2479 15.7251 23.8942V22.6132H16.3656C17.2486 22.6132 17.9669 21.8949 17.9669 21.0119C17.9669 20.129 17.2486 19.4106 16.3656 19.4106ZM16.3656 21.3322H15.7251V20.6917H16.3656C16.5422 20.6917 16.6859 20.8353 16.6859 21.0119C16.6859 21.1885 16.5422 21.3322 16.3656 21.3322Z"
                          fill="#45C769"
                        />
                        <path
                          d="M22.1977 12.1683L18.355 8.32561C18.3479 8.32087 18.1808 8.13794 17.902 8.13794H11.497C10.4374 8.13794 9.57544 8.99993 9.57544 10.0595V22.6134C9.57544 23.6729 10.4374 24.5349 11.497 24.5349H12.778C13.1317 24.5349 13.4185 24.2482 13.4185 23.8944C13.4185 23.5407 13.1317 23.2539 12.778 23.2539H11.497C11.1438 23.2539 10.8565 22.9666 10.8565 22.6134V10.0595C10.8565 9.70629 11.1438 9.41895 11.497 9.41895H17.2615V11.3405C17.2615 12.4 18.1235 13.262 19.1831 13.262H21.1046V17.7456C21.1046 18.0993 21.3913 18.3861 21.7451 18.3861C22.0988 18.3861 22.3856 18.0993 22.3856 17.7456V12.6215C22.3856 12.4533 22.3169 12.2871 22.1977 12.1683ZM19.1831 11.981C18.8299 11.981 18.5425 11.6937 18.5425 11.3405V10.3248L20.1988 11.981H19.1831Z"
                          fill="#45C769"
                        />
                        <path
                          d="M18.4299 16.3382H17.4823L16.4366 14.5271L16.9105 13.7064C17.1044 13.3706 17.1044 12.9696 16.9105 12.6338C16.7166 12.2979 16.3693 12.0974 15.9815 12.0974C15.5937 12.0974 15.2464 12.2979 15.0525 12.6338C14.8586 12.9696 14.8586 13.3706 15.0525 13.7064L15.5264 14.5271L14.4808 16.3382H13.5331C13.1453 16.3382 12.7981 16.5387 12.6042 16.8745C12.4103 17.2104 12.4103 17.6114 12.6042 17.9472C12.798 18.283 13.1453 18.4835 13.5331 18.4835H13.5331C13.9209 18.4835 14.2682 18.283 14.4621 17.9472L14.9359 17.1265H17.0271L17.501 17.9472C17.6949 18.283 18.0422 18.4835 18.4299 18.4835C18.8177 18.4835 19.165 18.283 19.3589 17.9472C19.5528 17.6114 19.5528 17.2104 19.3589 16.8745C19.165 16.5387 18.8177 16.3382 18.4299 16.3382ZM13.7794 17.553C13.7053 17.6814 13.5825 17.6952 13.5331 17.6952C13.4837 17.6952 13.3609 17.6814 13.2869 17.5531C13.2128 17.4247 13.2622 17.3114 13.2869 17.2687C13.3115 17.2259 13.3849 17.1265 13.5331 17.1265H14.0257L13.7794 17.553ZM15.7352 13.0279C15.7599 12.9852 15.8333 12.8857 15.9815 12.8857C16.1297 12.8857 16.2031 12.9851 16.2278 13.0279C16.2525 13.0707 16.3019 13.1839 16.2278 13.3123L15.9815 13.7389L15.7352 13.3123C15.6611 13.1839 15.7106 13.0707 15.7352 13.0279ZM15.391 16.3382L15.9815 15.3154L16.572 16.3382H15.391ZM18.6762 17.5531C18.6021 17.6814 18.4793 17.6952 18.4299 17.6952C18.3806 17.6952 18.2578 17.6814 18.1837 17.5531L17.9374 17.1265H18.4299C18.5781 17.1265 18.6515 17.2259 18.6762 17.2687C18.7009 17.3114 18.7503 17.4247 18.6762 17.5531Z"
                          fill="#45C769"
                        />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <span className="py-4 flex justify-center items-center cursor-pointer">
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
