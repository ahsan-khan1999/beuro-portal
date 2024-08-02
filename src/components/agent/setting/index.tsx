import React from "react";
import { useTranslation } from "next-i18next";
import { AgentProfileSetting } from "./setting-profile";

export const AgentSetting = () => {
  const { t: translate } = useTranslation();

  return (
    <>
      <h1 className="text-[#222B45] font-normal text-2xl mb-5">
        {translate("setting.heading")}
      </h1>

      <AgentProfileSetting />
    </>
  );
};
