import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { CustomerDetail } from "@/types/customer";
import { EmployeeDetail } from "@/types/employee";

const DetailsData = ({ date, id, name }: EmployeeDetail) => {
  console.log(date, "date");

  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          {router.pathname === "/employees/details" && (
            <Image
              src={backIcon}
              alt="backIcon"
              onClick={() => router.push("/employees")}
              className="cursor-pointer mr-6"
            />
          )}
          <h1 className="text-[#4B4B4B] text-2xl font-medium ">
            Employees Details
          </h1>
        </div>
        <div className="flex items-center gap-x-5">
          <Image
            src={printerIcon}
            alt="printerIcon"
            className="cursor-pointer"
          />
          <Image src={deleteIcon} alt="deleteIcon" className="cursor-pointer" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div>
        <div className="flex justify-between items-center max-w-[600px]">
          <h3 className="text-[#4D4D4D] ">
            Employee ID:
            <span className="text-[#4B4B4B] font-medium">&nbsp;&nbsp;{id}</span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            Created by:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;{name}
            </span>
          </h3>
        </div>
        <h3 className="text-[#4D4D4D] mt-4">
          Creation Date:
          <span className="text-[#4B4B4B] font-medium">
            &nbsp;&nbsp;{date?.toLocaleDateString()}
          </span>
        </h3>
      </div>
    </>
  );
};

export default DetailsData;
