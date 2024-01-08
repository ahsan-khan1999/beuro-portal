import Image from "next/image";
import React from "react";
import emptyState from "@/assets/svgs/empty-state.svg";
import { useTranslation } from "next-i18next";

export default function NoDataEmptyState() {
  const { t: translate } = useTranslation();
  return (
    <div className="w-full mt-6 flex flex-col gap-y-4 justify-center items-center rounded-lg ">
      <Image src={emptyState} alt={""} width={165} height={165} />
      <h1 className="text-dark font-semibold text-xl">
        {translate("empty_state.heading")}
      </h1>
      <p className=" text-gray text-base w-72 text-center">
        {translate("empty_state.description")}
      </p>
    </div>
  );
}
