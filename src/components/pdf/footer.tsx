import { DocumentDetailFooterProps } from "@/types/types";
import React from "react";

export const Footer = ({
  companyDomain,
  companyName,
  firstNumber,
  infoMail,
  lastNumber,
  postFinance,
  secondNumber,
  streeAdress,
  streetNumber,
}: DocumentDetailFooterProps) => {
  return (
    <div className="relative flex justify-center items-center h-[149px] px-[74px] py-[27px] w-full bg-[#EEEEEE]">
      <div className="flex justify-between gap-[60px]">
        <div>
          <span>{companyName}</span>
          <br />
          <span>{companyDomain}</span>
          <br />
          <span>{infoMail}</span>
          <br />
          <span>{firstNumber}</span>
          <br />
          <span>{secondNumber}</span>
        </div>

        <div className="h w-[2px] bg-[#D9D9D9] mx-4"></div>
        <div>
          <span>{postFinance}</span>
          <br />
          <span>{postFinance}</span>
          <br />
          <span>{streeAdress}</span>
          <br />
          <span>{streetNumber}</span>
          <br />
          <span>{lastNumber}</span>
        </div>
      </div>

      <div className="absolute bottom-5 right-[80px]">
        <span className="text-[#1E1E1E] text-[14px] font-medium mr-[10px]">
          Page
        </span>
        <span className="text-[#1E1E1E] text-[14px] font-medium">1/2 </span>
      </div>
    </div>
  );
};