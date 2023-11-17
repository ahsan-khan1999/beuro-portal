import React from "react";
import { AllCustomersTable } from "@/types/follow-up";

const TableRows = ({
  currentPageRows,
  handleCustomerDetail,
}: AllCustomersTable) => {
  console.log(handleCustomerDetail);
  
  return (
    <div>
      {currentPageRows?.map((item: any, index: number) => {
        return (
          <div
            onClick={handleCustomerDetail}
            key={index}
            className="border border-[#4A13E7] cursor-pointer shadow-tableRow grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(200px,_200px)_minmax(180px,_180px)_minmax(170px,_170px)_minmax(160px,_160px)_minmax(160px,_160px)] mt-2 bg-white rounded-md p-4"
          >
            <span className=" bg-white rounded-md flex items-center ">
              {item.id}
            </span>
            <span className=" bg-white  flex items-center">{item.name}</span>
            <span className=" bg-white flex items-center">{item.email}</span>
            <span className=" bg-white flex items-center">
              {item.phoneNumber}
            </span>
            <span className=" bg-white flex items-center">
              {item.createdOn.toLocaleDateString()}
            </span>
            <span className=" bg-white flex items-center">{item.location}</span>
            <span className=" bg-white flex items-center">{item.type}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
