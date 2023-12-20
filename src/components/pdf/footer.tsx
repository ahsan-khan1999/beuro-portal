import { DocumentDetailFooterProps } from "@/types/types";
import React from "react";

export const Footer = ({
  firstColumn,
  fourthColumn,
  secondColumn,
  thirdColumn,
}: DocumentDetailFooterProps) => {
  return (
    <div className="relative flex justify-center items-center h-[149px] px-[74px] py-[27px] w-full bg-[#EEEEEE]">
      <div className="flex justify-between gap-[60px]">
        <div>
          <span>{firstColumn?.companyName}</span>
          <br />
          <span>{firstColumn?.website}</span>
          <br />
          <span>{firstColumn?.email}</span>
          <br />
          <span>{firstColumn?.phoneNumber}</span>
          <br />
          <span>{firstColumn?.taxNumber}</span>
        </div>

        {/* 2nd column */}
        <div className="h w-[2px] bg-[#D9D9D9] mx-4"></div>
        <div>
          <span>{secondColumn?.address?.streetNumber}</span>
          <br />
          <span>{secondColumn?.address?.postalCode}</span>
          <br />
          <span>{secondColumn?.bankDetails?.bankName}</span>
          <br />
          <span>{secondColumn?.bankDetails?.accountNumber}</span>
          <br />
          <span>{secondColumn?.bankDetails?.ibanNumber}</span>
        </div>

        {/* 3rd column */}
        <div className="h w-[2px] bg-[#D9D9D9] mx-4"></div>
        <div>
          <span>{thirdColumn?.address?.streetNumber}</span>
          <br />
          <span>{thirdColumn?.address?.postalCode}</span>
          <br />
          <span>{thirdColumn?.bankDetails?.bankName}</span>
          <br />
          <span>{thirdColumn?.bankDetails?.accountNumber}</span>
          <br />
          <span>{thirdColumn?.bankDetails?.ibanNumber}</span>
        </div>

        {/* fourth column */}
        <div className="h w-[2px] bg-[#D9D9D9] mx-4"></div>
        <div>
          <span>{fourthColumn?.address?.streetNumber}</span>
          <br />
          <span>{fourthColumn?.address?.postalCode}</span>
          <br />
          <span>{fourthColumn?.bankDetails?.bankName}</span>
          <br />
          <span>{fourthColumn?.bankDetails?.accountNumber}</span>
          <br />
          <span>{fourthColumn?.bankDetails?.ibanNumber}</span>
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
