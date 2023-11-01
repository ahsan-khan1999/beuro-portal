import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const DetailsData = () => {
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
        <div className="flex items-center">
          <Image src={printerIcon} alt="printerIcon" />
          <Image src={deleteIcon} alt="deleteIcon" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div>
        <div className="flex justify-between items-center max-w-[600px]">
          <h3 className="text-[#4D4D4D] ">
            Employee ID:
            <span className="text-[#4B4B4B] font-medium">&nbsp;&nbsp;001</span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            Created by:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;Ahmad Rahal
            </span>
          </h3>
        </div>
        <h3 className="text-[#4D4D4D] mt-4">
          Creation Date:
          <span className="text-[#4B4B4B] font-medium">
            &nbsp;&nbsp;25/08/2023
          </span>
        </h3>
      </div>
    </>
  );
};

export default DetailsData;
