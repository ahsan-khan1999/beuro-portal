import React from "react";
import Image from "next/image";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import PasswordCopyField from "@/base-components/ui/password-copy-field";
import SettingLayout from "../SettingLayout";
import { useTranslation } from "next-i18next";

const ConnectWithBuro = () => {
  const tagData: string[] = ["loremipsum", "loremipsum", "loremipsum"];
  const password = "#MaT33n"
  const { t: translate } = useTranslation();

  return (
    <SettingLayout>
      <div className="mb-4">
        <p className="text-[#393939] text-lg font-normal mt-3 ">
          {translate("setting.system_setting.connect_with_buro")}
        </p>

        <p className="text-[#1E1E1E] text-xs font-normal mt-2">
          {translate("setting.system_setting.description")}
          <span className="text-[#F00] cursor-pointer">&nbsp; help center</span>
        </p>

        <div>
          <p className="text-[#1E1E1E] text-sm font-normal mt-[14px] mb-2">
          {translate("setting.system_setting.allowed_domain")}
          </p>

          <div className="border border-[#BFBFBF] rounded-md px-[25px] py-3 flex gap-4">
            {tagData.map((item, index) => (
              <div
                className="bg-[#D9D9D9] rounded-md px-2 py-[6px] flex items-center gap-4 "
                key={index}
              >
                <span className="text-[#1E1E1E] font-normal text-sm ">
                  {item}
                </span>
                <Image
                  src={crossIcon}
                  alt="crossIcon"
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[#1E1E1E] text-sm font-normal mt-[14px] mb-2">
          {translate("setting.system_setting.security_token")}
          </p>

          <PasswordCopyField password={password} />

        </div>
      </div>
    </SettingLayout>
  );
};

export default ConnectWithBuro;
