import React from "react";
import { useRouter } from "next/router";
import ServicesFilters from "./services-filters";
import Image from "next/image";
import addIcon from "@/assets/svgs/plus_icon.svg";

const TableFunctions = () => {
  const router = useRouter();

  return (
    <div className="flex items-center ">
      <ServicesFilters />
      <button
        onClick={() => router.push("/services/add")}
        className="flex items-center gap-x-3 py-2 pl-2 pr-[10px] px-[8px]  text-[13px] font-semibold bg-primary text-white rounded-md ml-8 whitespace-nowrap"
      >
        <Image src={addIcon} alt="addIcon" />
        Add New
      </button>
    </div>
  );
};

export default TableFunctions;
