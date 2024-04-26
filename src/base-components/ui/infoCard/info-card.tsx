import React from "react";
import { BaseCard } from "../base-card";

export const InfoCard = ({ info }: { info: string }) => {
  return (
    <div className="flex absolute top-5 -left-2">
      <BaseCard containerClassName="ml-[9px] max-w-[300px] shadow-md text-dark text-xs !!p-5 px-[10px] py-2 text-left z-[9999]">
        {info}
      </BaseCard>
    </div>
  );
};
