import { Plan } from "@/types/admin/plans";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import deleteIcon from "@/assets/pngs/border_delete.png";
import Image from "next/image";

const TableRow = ({
  currentPageRows,
  handleDelete,
}: {
  currentPageRows: Plan[];
  handleDelete: (index: string) => void;
}) => {
  const router = useRouter();

  const { t: translate } = useTranslation();

  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            key={index}
            className="hover:bg-[#E9E1FF] items-center bg-white px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(400px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(180px,_100%)_minmax(70px,_70px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(60px,_60px),minmax(100px,_100px)_minmax(200px,_100%)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(50px,_50px)] mt-2  rounded-md"
          >
            <span className="py-4 truncate">{item?.refID}</span>
            <span className="py-4 truncate">
              {translate(`plan_status.${item?.planName}`)}
            </span>
            <span className="py-4 truncate">{item?.description}</span>
            <span className="py-4 truncate">{item?.monthlyPrice}</span>
            <span className="py-4 flex justify-center items-center">
              {item?.numberOfEmployees}
            </span>
            <div
              className="py-4 flex justify-center items-center"
              onClick={() => handleDelete(item?.refID)}
            >
              <Image
                src={deleteIcon}
                alt="delete record"
                width={40}
                height={40}
              />
            </div>
            <span
              className="flex justify-center items-center"
              onClick={() =>
                router.push({
                  pathname: "/admin/plans/details",
                  query: { plans: item.id },
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

export default TableRow;
