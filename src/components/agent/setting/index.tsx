import React from "react";
import { useTranslation } from "next-i18next";
import { AgentProfileSetting } from "./setting-profile";
import { useRouter } from "next/router";
import FormCard from "@/layout/customers/FormCard";

export const AgentSetting = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();

  const handleBack = () => {
    router.push({
      pathname: "/agent/dashboard",
    });
  };

  return (
    <FormCard containerClassName="p-5">
      <div className="flex items-center gap-x-4 border-b border-b-[#000] border-opacity-10 pb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          className="cursor-pointer"
          onClick={handleBack}
        >
          <rect
            x="0.750977"
            y="0.5"
            width="39.2105"
            height="39"
            rx="7.5"
            fill="white"
            stroke="#4A13E7"
          />
          <path
            d="M23.7911 13.2658C23.975 13.4498 24.0783 13.6993 24.0783 13.9594C24.0783 14.2196 23.975 14.4691 23.7911 14.6531L18.9346 19.5095L23.7911 24.366C23.9698 24.551 24.0687 24.7989 24.0664 25.0561C24.0642 25.3134 23.961 25.5594 23.7791 25.7413C23.5972 25.9232 23.3511 26.0264 23.0939 26.0287C22.8366 26.0309 22.5888 25.932 22.4038 25.7533L16.8537 20.2032C16.6697 20.0192 16.5664 19.7697 16.5664 19.5095C16.5664 19.2494 16.6697 18.9999 16.8537 18.8159L22.4038 13.2658C22.5878 13.0818 22.8373 12.9785 23.0974 12.9785C23.3576 12.9785 23.6071 13.0818 23.7911 13.2658Z"
            fill="#4A13E7"
          />
        </svg>
        <p className="font-semibold text-2xl">{translate("setting.heading")}</p>
      </div>

      <AgentProfileSetting />
    </FormCard>
  );
};
