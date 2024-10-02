import React from "react";
import SettingLayout from "../SettingLayout";
import Image from "next/image";
import silvreIcon from "@/assets/svgs/sliver_ion.svg";
import { useTranslation } from "next-i18next";

type PlanData = {
  title: string;
  status: string;
};

const PlanComp = () => {
  const { t: translate } = useTranslation();

  const planData: PlanData[] = [
    {
      title: `${translate("setting.billing.request_services.managers")}`,
      status: "Not Included",
    },
    {
      title: `${translate("setting.billing.request_services.account_reports")}`,
      status: "Not Included",
    },
    {
      title: `${translate("setting.billing.request_services.customize_email")}`,
      status: "Not Included",
    },
    {
      title: `${translate("setting.billing.request_services.watermark")}`,
      status: "Not Included",
    },
    {
      title: `${translate("setting.billing.request_services.features")}`,
      status: "Not Included",
    },
  ];

  return (
    <SettingLayout>
      <div className="px-8 py-6 bg-white">
        <div className="flex justify-between mt-3 ">
          <span className="text-[#4B4B4B] font-normal text-lg">
            {translate("setting.billing.heading")}
          </span>
          <span className="text-sm font-medium text-[#8F8F8F]">
            <strong className="text-lg font-medium text-black">CHF0</strong>/
            {translate("common.month")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-[45px] mt-[30px] ">
          <div className="flex flex-col">
            <article className="flex gap-x-2">
              <Image src={silvreIcon} alt="silvreIcon" />
              <span className="text-lg text-black font-medium">
                {" "}
                {translate("setting.billing.package_name")}
              </span>
            </article>

            <p className="mt-[25px] text-sm font-normal tetx-[#4B4B4B]">
              {translate("setting.billing.package_description")}
            </p>
          </div>

          <div>
            <section>
              <span className="text-[#4B4B4B] font-normal text-xs">
                {translate("setting.billing.request_services.heading")}:
              </span>
              <div>
                <p
                  className="h-2 bg-[#D9D9D9] rounded-md mt-2"
                  style={{
                    background: `linear-gradient(to right, #4A13E7 50%, #D9D9D9 50%)`,
                  }}
                ></p>
                <p className="flex justify-between mt-1">
                  <span>0</span>
                  <span>10</span>
                  <span>20</span>
                </p>
              </div>
            </section>

            <section className="mt-3">
              {planData?.map((item, index) => (
                <div className="flex justify-between mb-1" key={index}>
                  <span className="text-[#4B4B4B] text-sm font-normal">
                    {item.title}
                  </span>
                  <span className="text-[#4B4B4B] text-sm font-normal">
                    {item.status}
                  </span>
                </div>
              ))}
            </section>

            <button className="border border-[#BFBFBF] rounded-lg p-4 text-center mt-[30px] w-full">
              <span className="text-[#393939] font-medium text-base">
                {translate("setting.billing.request_services.change_button")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </SettingLayout>
  );
};

export default PlanComp;
