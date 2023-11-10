import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import addIcon from "@/assets/svgs/plus_icon.svg";

const TableFunctions = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">Plans Management</h1>

      <button
        onClick={() => router.push("/admin/plans/details")}
        className="py-2 px-[10px]  cursor-pointer flex items-center gap-x-2 text-[13px] font-semibold bg-primary text-white rounded-md ml-8 whitespace-nowrap"
      >
        <Image src={addIcon} alt="addIcon" />
        Add New
      </button>
    </div>
  );
};

export default TableFunctions;
