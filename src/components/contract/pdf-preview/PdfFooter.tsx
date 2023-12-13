import React from "react";

const PdfFooter = () => {
  return (
    <div className="relative flex justify-center items-center h-[149px] px-[74px] py-[27px] w-full bg-[#EEEEEE]">
      <div className="flex justify-between gap-[60px]">
        <div>
          <span>Umzugsfuchs</span>
          <br />
          <span>umzugsfuchs.ch</span>
          <br />
          <span>info@umzugsfuchs.ch</span>
          <br />
          <span>0782141114</span>
          <br />
          <span>0800400410</span>
        </div>

        <div className="h w-[2px] bg-[#D9D9D9] mx-4"></div>
        <div>
          <span>PostFinance</span>
          <br />
          <span>PostFinance</span>
          <br />
          <span>St. Urbanstrasse 79,</span>
          <br />
          <span>4914, Roggwil</span>
          <br />
          <span>15-561356-9</span>
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

export default PdfFooter;
