import { detailScreenCardsLayout } from "@/types";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
import companyIcon from "@/assets/svgs/company-details.svg";

import Image from "next/image";

export const DetailScreensCard = ({
  children,
  currentFormStage,
}: detailScreenCardsLayout) => {
  console.log(currentFormStage);

  return (
    <div className="flex flex-col justify-center min-h-screen mx-10">
      <div className="mx-auto max-w-[890px] w-full rounded-2xl    shadow-loginCard bg-white">
        <div className="grid grid-cols-3 bg-[#FAFAFA] rounded-tl-2xl rounded-tr-2xl min-w-full">
          <div className="flex justify-center items-center pl-[53px] pr-11 py-4  bg-primary rounded-r-[24px] rounded-tl-2xl cursor-pointer w-full">
            <Image src={companyIcon} alt="Company Icon" className="mr-[10px]" />
            <h2 className="text-sm text-white font-semibold tracking-[0.42px]">
              Company Details
            </h2>
          </div>
          <div className="flex  justify-center items-center py-4 mx-auto cursor-pointer w-full">
            <Image src={companyIcon} alt="Company Icon" className="mr-[10px]" />
            <h2 className="text-sm text-[#B9B9B9] font-semibold tracking-[0.42px]">
              Location Details
            </h2>
          </div>
          <div className="flex justify-center items-center py-4 mx-auto cursor-pointer w-full">
            <Image src={companyIcon} alt="Company Icon" className="mr-[10px]" />
            <h2 className="text-sm text-[#B9B9B9] font-semibold tracking-[0.42px]">
              Bank Details
            </h2>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};
