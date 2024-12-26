import { Plan } from "@/types/admin/plans";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import Image from "next/image";
import { EditIcon } from "@/assets/svgs/components/edit-icon";

export interface AdminPlansProps {
  currentPageRows: Plan[];
  handleDelete: (index: string) => void;
}

const TableRow = ({ currentPageRows }: AdminPlansProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div className={`overflow-y-visible`}>
      {currentPageRows?.map((item, index) => {
        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                onClick={() =>
                  router.push({
                    pathname: "/admin/plans/details",
                    query: { plans: item?.id },
                  })
                }
                className={`${index % 2 === 0 ? "bg-white" : "bg-tableRowBg"} ${
                  index === 0 && "mt-2"
                } items-center cursor-pointer hover:bg-[#E9E1FF] rounded-md pl-4 pr-1 gap-x-4 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(200px,_200px)_minmax(400px,_4fr)_minmax(100px,_100px)_minmax(130px,_130px)] mlg:grid-cols-[minmax(50px,_50px),minmax(200px,_200px)_minmax(150px,_4fr)_minmax(80px,_80px)_minmax(100px,_100px)] xlg:grid-cols-[minmax(60px,_60px),minmax(200px,_200px)_minmax(200px,_4fr)_minmax(100px,_100px)_minmax(120px,_120px)] ${
                  index !== 0 && "border-t border-t-[#E7EAEE]"
                }`}
              >
                <span className="py-4 truncate">{item?.refID}</span>
                <span className="py-4 truncate">
                  {translate(`plan_status.${item?.planName}`)}
                </span>
                <span className="py-4 truncate">{item?.description}</span>
                <span className="py-4 truncate">{item?.monthlyPrice}</span>
                <span className="py-4">{item?.numberOfEmployees}</span>
              </div>
            </div>

            <div className="gap-x-2 grid grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)]">
              <div className="flex justify-center items-center">
                <div className="border border-[#ED2F2F] rounded-lg w-[34px] h-[34px] flex items-center justify-center cursor-pointer">
                  <Image
                    src={deleteIcon}
                    alt="delete record"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              {/* <div
                className="flex justify-center items-center"
                onClick={() =>
                  router.push({
                    pathname: "/admin/plans/details",
                    query: { plans: item.id },
                  })
                }
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg cursor-pointer">
                  <div className="p-[5px] rounded-md w-[34px] h-[34px] border border-primary flex justify-center items-center">
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
              </div> */}

              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() =>
                  router.push({
                    pathname: "/admin/plans/details",
                    query: { plans: item?.id },
                  })
                }
                title={translate("leads.table_headings.edit")}
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <span className="p-[5px] rounded-md w-[32px] h-[32px] border border-primary flex justify-center items-center">
                    <EditIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
