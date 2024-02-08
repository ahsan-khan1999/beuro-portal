import React from "react";
import { useRouter } from "next/router";
import { Employee } from "@/types/employee";
import moment from "moment";

const TableHeadings = ({ employsData }: { employsData: Employee[] }) => {
  const router = useRouter();

  return (
    <div>
      {employsData?.map((item: any) => {
        return (
          <div
            key={item.id}
            onClick={() =>
              router.push({
                pathname: "/employees/details",
                query: { employee: item.id },
              })
            }
            className="cursor-pointer hover:bg-[#E9E1FF] px-6  shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(250px,_250px)_minmax(250px,_100%)_minmax(160px,_160px)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(80px,_80px),minmax(150px,_150px)_minmax(100px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(80px,_80px)] xlg:grid-cols-[minmax(80px,_80px),minmax(200px,_4fr)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(140px,_140px)_minmax(80px,_80px)] mt-2 bg-white rounded-md items-center"
          >
            <span className="py-4 truncate">{item?.employeeID}</span>
            <span className="py-4 truncate">{item.fullName}</span>
            <span className="py-4 truncate">{item.email}</span>
            <span className="py-4 truncate">{item.phoneNumber}</span>
            <span className="py-4 truncate">{item.designation}</span>
            <span className="py-4 flex items-center">
              {moment(item?.creationDate).format("DD/MM/YYYY")}
            </span>

            <span
              onClick={() =>
                router.push({
                  pathname: "/employees/details",
                  query: { employee: item.id },
                })
              }
              className="flex justify-center items-center cursor-pointer"
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
                    d="M0.650632 14.4913C0.480224 14.3083 0.39502 14.0917 0.39502 13.8414C0.39502 13.5911 0.480224 13.3747 0.650632 13.1922L5.6436 7.83146L0.633591 2.45238C0.474543 2.28161 0.39502 2.06816 0.39502 1.81201C0.39502 1.55587 0.480224 1.33631 0.650632 1.15335C0.82104 0.970387 1.0228 0.878906 1.25592 0.878906C1.48904 0.878906 1.69058 0.970387 1.86053 1.15335L7.58625 7.31916C7.65442 7.39235 7.70281 7.47163 7.73144 7.55701C7.76007 7.6424 7.77416 7.73388 7.7737 7.83146C7.7737 7.92904 7.75939 8.02052 7.73076 8.1059C7.70213 8.19128 7.65396 8.27057 7.58625 8.34375L1.84349 14.5096C1.68444 14.6803 1.48836 14.7657 1.25524 14.7657C1.02212 14.7657 0.820586 14.6742 0.650632 14.4913Z"
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

export default TableHeadings;
