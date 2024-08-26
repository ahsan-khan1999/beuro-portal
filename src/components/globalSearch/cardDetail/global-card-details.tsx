import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import CardDetails from "./card-details";
import { TFunction } from "i18next";

export const GlobalCardDetails = ({
  translate,
}: {
  translate: TFunction<"translation", undefined>;
}) => {
  return (
    <div className="px-[18px] pt-5 pb-3 bg-white rounded-md">
      <div className="flex items-center gap-x-[26px] border-b-2 border-[#000] border-opacity-10 pb-5">
        <Image src={backIcon} alt="backIcon" />
        <span className="text-2xl font-medium text-[#4B4B4B]">
          {translate("global_search.customer")}
        </span>
      </div>

      <CardDetails />
    </div>
  );
};
