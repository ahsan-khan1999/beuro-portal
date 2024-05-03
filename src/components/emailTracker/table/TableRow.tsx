import React from "react";
import { useRouter } from "next/router";
import { TableRowEmailTracker } from "@/types/emailTracker";
import {
  formatDateTimeToDate,
  formatDateTimeToTime,
  getMailStatusColor,
} from "@/utils/utility";
import { useTranslation } from "next-i18next";

const TableRow = ({ dataToAdd }: { dataToAdd: TableRowEmailTracker[] }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div>
      {dataToAdd?.map((item, index: number) => {
        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                onClick={() =>
                  router.push({
                    pathname: "/email-tracker/view-mail",
                    query: { email: item?.id },
                  })
                }
                key={item.id}
                className="px-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-3 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(200px,_4fr)_minmax(300px,_3fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)] mlg:grid-cols-[minmax(80px,_80px),minmax(100px,_100%)_minmax(130px,_130px)_minmax(100px,_100px)] xlg:grid-cols-[minmax(100px,_100px),minmax(130px,_4fr)_minmax(130px,_3fr)_minmax(100px,_100px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(140px,_4fr)_minmax(130px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(160px,_4fr)_minmax(130px,_3fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)] border-t border-t-[#E7EAEE]"
              >
                <span className="py-4 truncate">
                  {item?.id && item.id.slice(-5)}
                </span>
                <span className="py-4 truncate">{item.recipient}</span>
                <span className="xs:block mlg:hidden xlg:hidden maxSize:block py-4 truncate mr-1">
                  {item.subject}
                </span>
                <div className="py-4 flex flex-col">
                  <span>{formatDateTimeToTime(item.createdAt)}</span>
                  <span>{formatDateTimeToDate(item.createdAt)}</span>
                </div>
                <div className="py-4 flex flex-col mlg:hidden xMaxSize:flex">
                  {(item.viewedAt && (
                    <>
                      <span>{formatDateTimeToTime(item.viewedAt)}</span>
                      <span>{formatDateTimeToDate(item.viewedAt)}</span>
                    </>
                  )) || <span className="flex my-auto align-middle">-</span>}
                </div>
                <span className="py-4 flex justify-center items-center">
                  <div
                    className={`bg-[${getMailStatusColor(
                      item?.mailStatus
                    )}] text-white px-2 py-1 text-center rounded-md text-sm min-w-[70px] w-full`}
                  >
                    {translate(`mail_tracker_status.${item?.mailStatus}`)}
                  </div>
                </span>
              </div>
            </div>

            <div className="ml-2 grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)]">
              <span className="py-3 flex justify-center items-center cursor-pointer">
                <span
                  title={translate("email_tracker.table_headings.view_mail")}
                  onClick={() =>
                    router.push({
                      pathname: "/email-tracker/view-mail",
                      query: { email: item?.id },
                    })
                  }
                  className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      opacity="1"
                      d="M1.12891 4.34055C1.12891 2.59917 2.54057 1.1875 4.28195 1.1875H24.7768C26.5181 1.1875 27.9298 2.59917 27.9298 4.34055V24.8354C27.9298 26.5767 26.5181 27.9884 24.7768 27.9884H4.28195C2.54057 27.9884 1.12891 26.5767 1.12891 24.8354V4.34055Z"
                      stroke={`${getMailStatusColor(item?.mailStatus)}`}
                    />
                    <path
                      d="M14.4499 16.1375C15.3211 16.1375 16.0273 15.4299 16.0273 14.557C16.0273 13.6842 15.3211 12.9766 14.4499 12.9766C13.5788 12.9766 12.8726 13.6842 12.8726 14.557C12.8726 15.4299 13.5788 16.1375 14.4499 16.1375Z"
                      fill={`${getMailStatusColor(item?.mailStatus)}`}
                    />
                    <path
                      d="M6.66915 15.0562C7.70759 16.36 10.7966 19.837 14.4508 19.837C18.1051 19.837 21.1941 16.3602 22.2325 15.0562C22.4559 14.7664 22.4559 14.3581 22.2325 14.0817C21.1941 12.7778 18.1051 9.30082 14.4508 9.30082C10.7966 9.28765 7.70759 12.7646 6.66915 14.0685C6.43255 14.3583 6.43255 14.7664 6.66915 15.0562ZM14.4508 11.3949C16.1991 11.3949 17.6056 12.8041 17.6056 14.5558C17.6056 16.3075 16.1991 17.7167 14.4508 17.7167C12.7026 17.7167 11.2961 16.3075 11.2961 14.5558C11.2961 12.8041 12.7026 11.3949 14.4508 11.3949Z"
                      fill={`${getMailStatusColor(item?.mailStatus)}`}
                    />
                  </svg>
                </span>
              </span>

              <span className="py-4 flex justify-center items-center cursor-pointer">
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <div
                    onClick={() =>
                      router.push({
                        pathname: "/email-tracker/view-mail",
                        query: { email: item?.id },
                      })
                    }
                    title={translate("email_tracker.table_headings.edit")}
                    className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center"
                  >
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
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
