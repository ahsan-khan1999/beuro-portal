import React from "react";
import { useTranslation } from "next-i18next";
import { AgentProfileSetting } from "./setting-profile";
import { useRouter } from "next/router";
import FormCard from "@/layout/customers/FormCard";
import { BackIcon } from "@/assets/svgs/components/back-icon";

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
        <BackIcon onClick={handleBack} />
        <p className="font-semibold text-lg xMini:text-2xl">
          {translate("setting.heading")}
        </p>
      </div>

      <AgentProfileSetting />
    </FormCard>
  );
};
