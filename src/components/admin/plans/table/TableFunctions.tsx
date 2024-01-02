import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { useTranslation } from "next-i18next";

const TableFunctions = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">
        {translate("admin.plans_management.main_heading")}
      </h1>

      <button
        onClick={() => router.push("/admin/plans/create")}
        className="py-2 px-[10px]  cursor-pointer flex items-center gap-x-2 text-[13px] font-semibold bg-primary text-white rounded-md ml-8 whitespace-nowrap"
      >
        <Image src={addIcon} alt="addIcon" />
        {translate("admin.plans_management.add_button")}
      </button>
    </div>
  );
};

export default TableFunctions;
