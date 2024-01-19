import { Plan } from "@/types/admin/plans";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({
  currentPageRows,
  handleDelete,
}: {
  currentPageRows: Plan[];
  handleDelete: (index: string) => void;
}) => {
  const router = useRouter();
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            key={index}
            className="hover:bg-[#E9E1FF] items-center bg-white px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(400px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(180px,_100%)_minmax(70px,_70px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(60px,_60px),minmax(100px,_100px)_minmax(200px,_100%)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(50px,_50px)] mt-2  rounded-md"
          >
            <span className="py-4 truncate">{item?.refID}</span>
            <span className="py-4 truncate">{item?.planName}</span>
            <span className="py-4 truncate">{item?.description}</span>
            <span className="py-4 truncate">{item?.monthlyPrice}</span>
            <span className="py-4 flex justify-center items-center">
              {item?.numberOfEmployees}
            </span>
            <span
              className="py-4 flex justify-center items-center"
              onClick={() => handleDelete(item?.refID)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
              >
                <rect
                  x="0.758301"
                  y="0.96875"
                  width="39.2105"
                  height="39"
                  rx="7.5"
                  fill="white"
                  stroke="#ED2F2F"
                />
                <path
                  d="M24.3068 12.8044H26.5709H26.571C27.5083 12.8046 28.2982 13.5096 28.4192 14.4494L28.4192 14.4494C28.5366 15.3633 27.9867 16.2269 27.1235 16.4979V27.9629C27.1235 28.6686 26.8684 29.3341 26.4192 29.8135C25.9719 30.2944 25.349 30.5676 24.6965 30.5688H24.6963H15.9599H15.9597C15.3074 30.5676 14.6845 30.2943 14.2371 29.8135C13.7878 29.3341 13.5327 28.6686 13.5327 27.9629V16.4979C12.6696 16.2269 12.1196 15.3633 12.237 14.4494L12.237 14.4494C12.358 13.5096 13.1479 12.8046 14.0853 12.8044H14.0853H16.3494V12.3192V12.3189L24.3068 12.8044ZM24.3068 12.8044V12.3191M24.3068 12.8044V12.3191M24.3068 12.3191V12.3189H24.2068L24.3068 12.3191ZM17.4729 12.3189H17.4729L17.4729 12.3177C17.4702 12.1004 17.5544 11.8915 17.706 11.7385L17.7061 11.7385C17.8574 11.5856 18.0631 11.5018 18.2763 11.5056L18.2763 11.5056H18.278H22.3782V11.5056L22.38 11.5056C22.5931 11.5018 22.7988 11.5856 22.9502 11.7385L22.9502 11.7386C23.1018 11.8913 23.1861 12.1004 23.1833 12.3177L23.1833 12.3177V12.3189V12.8044H17.4729V12.3189ZM23.0522 17.6148C22.7406 17.6148 22.4905 17.8706 22.4905 18.1832V27.0357C22.4905 27.348 22.7406 27.604 23.0522 27.604C23.3638 27.604 23.614 27.348 23.614 27.0357V18.1832C23.614 17.8706 23.3638 17.6148 23.0522 17.6148ZM17.6038 17.6148C17.2922 17.6148 17.042 17.8706 17.042 18.1832V27.0357C17.042 27.348 17.2921 27.604 17.6038 27.604C17.9154 27.604 18.1655 27.348 18.1655 27.0357V18.1832C18.1655 17.8706 17.9154 17.6148 17.6038 17.6148ZM24.6963 29.432H15.9599C15.2359 29.432 14.6562 28.7997 14.6562 27.9629V16.5641H26V27.9629C26 28.7997 25.4204 29.432 24.6963 29.432ZM14.0853 13.9412H26.5709C26.9734 13.9412 27.3021 14.2725 27.3021 14.6843C27.3021 15.096 26.9734 15.4273 26.5709 15.4273H14.0853C13.6828 15.4273 13.3541 15.096 13.3541 14.6843C13.3541 14.2725 13.6828 13.9412 14.0853 13.9412ZM20.3277 17.6148C20.0161 17.6148 19.7659 17.8706 19.7659 18.1832V27.0357C19.7659 27.348 20.016 27.604 20.3277 27.604C20.6393 27.604 20.8894 27.348 20.8894 27.0357V18.1832C20.8894 17.8706 20.6393 17.6148 20.3277 17.6148Z"
                  fill="#ED2F2F"
                  stroke="#ED2F2F"
                  strokeWidth="0.2"
                />
              </svg>
            </span>
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
