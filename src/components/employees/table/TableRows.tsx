import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Employee } from "@/types/employee";
import editInfoIcon from "@/assets/svgs/edit_info.svg";
import moment from "moment";

const TableHeadings = ({ employsData }: { employsData: Employee[] }) => {
  const router = useRouter();

  return (
    <div>
      {employsData?.map((item: any) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/employees/details",
                query: { employee: item.id },
              })
            }
            key={item.id}
            className="hover:bg-[#E9E1FF] px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto  mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(150px,_150px)_minmax(200px,_100%)_minmax(160px,_160px)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(60px,_60px)] mlg:grid-cols-[minmax(80px,_80px),minmax(120px,_120px)_minmax(160px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px),minmax(150px,_150px)_minmax(170px,_100%)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4 roeditInfoIconunded-md flex  items-center">
              {item.id.substring(0, 4)}
            </span>
            <span className="py-4 flex items-center">{item.fullName}</span>
            <span className="py-4 flex items-center">{item.email}</span>
            <span className="py-4 flex items-center">{item.phoneNumber}</span>
            <span className="py-4 flex items-center">{item.designation}</span>
            <span className="py-4 flex items-center">
              {moment(item?.creationDate).format("DD/MM/YYYY")}
            </span>

            <span className="py-4 flex justify-center items-center">
              <div
                onClick={() =>
                  router.push({
                    pathname: "/employees/details",
                    query: { employee: item.id },
                  })
                }
                className="cursor-pointer"
              >
                <Image src={editInfoIcon} alt="editInfoIcon" />
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableHeadings;
