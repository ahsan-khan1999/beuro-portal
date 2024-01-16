import React, { SetStateAction, useRef } from "react";
import Image from "next/image";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import PasswordCopyField from "@/base-components/ui/password-copy-field";
import SettingLayout from "../SettingLayout";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/hooks/useRedux";
import { SystemSettingDataProps } from "@/types/settings";
import InputField from "@/base-components/filter/fields/input-field";

const ConnectWithBuro = ({
  systemSetting,
  setSystemSetting,
}: {
  systemSetting: SystemSettingDataProps;
  setSystemSetting: SetStateAction<any>;
}) => {
  const tagData: string[] = ["loremipsum", "loremipsum", "loremipsum"];
  const domainInput = useRef("");
  const password = "#MaT33n";
  const { t: translate } = useTranslation();
  const handleDelete = (index: number) => {
    let domain = [...(systemSetting?.allowedDomains || [])];
    domain.splice(index, 1);
    setSystemSetting({ ...systemSetting, ["allowedDomains"]: domain });
  };
  const handleChange = (value: string) => {
    domainInput.current = value;
  };
  const handleSubmit = () => {
    event?.preventDefault();
    if (!domainInput.current) return;
    let domain = [...(systemSetting?.allowedDomains || [])];
    domain.push(domainInput.current);
    setSystemSetting({ ...systemSetting, ["allowedDomains"]: domain });
    domainInput.current = "";
  };
  return (
    <SettingLayout>
      <div className="pl-[31px] pt-6 pb-5 pr-5 bg-white">
        <p className="text-[#393939] text-lg font-normal mt-3 ">
          {translate("setting.system_setting.connect_with_buro")}
        </p>

        <p className="text-[#1E1E1E] text-xs font-normal mt-2">
          {translate("setting.system_setting.description")}
          <span className="text-[#F00] cursor-pointer">
            &nbsp; {translate("common.help")}
          </span>
        </p>
        {/* <div>
          <p className="text-[#1E1E1E] text-sm font-normal mt-[14px] mb-2">
            {translate("setting.system_setting.add_domain")}
          </p>
          <InputField value="" handleChange={handleChange} containerClassName=""/>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-[#1E1E1E] text-sm font-normal mt-[14px] mb-2">
              {translate("setting.system_setting.allowed_domain")}
            </p>

            <div className="border border-[#BFBFBF] rounded-md px-[25px] py-3 flex gap-4">
              {systemSetting?.allowedDomains?.map((item, index) => (
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
                    onClick={() => handleDelete(index)}
                  />
                </div>
              ))}
              <InputField
                key={Math.random()}
                value={domainInput.current}
                handleChange={(value) => handleChange(value)}
                containerClassName="border border-[#BFBFBF] rounded-md "
              />
            </div>
          </div>
        </form>

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
