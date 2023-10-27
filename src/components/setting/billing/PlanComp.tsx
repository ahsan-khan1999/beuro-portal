import React from "react";
import SettingLayout from "../SettingLayout";
import Image from "next/image";
import silvreIcon from "@/assets/svgs/sliver_ion.svg";

type PlanData = {
  title: string;
  status: string;
};

const PlanComp = () => {
  const planData: PlanData[] = [
    {
      title: "Managers",
      status: "Not Included",
    },
    {
      title: "Accounting Reports",
      status: "Not Included",
    },
    {
      title: "Customize Email",
      status: "Not Included",
    },
    {
      title: "With Watermark",
      status: "Not Included",
    },
    {
      title: "API Features",
      status: "Not Included",
    },
  ];

  return (
    <SettingLayout>
      <div className="mx-4 mb-4 ">
        <div className="flex justify-between mt-3 ">
          <span className="text-[#4B4B4B] font-normal text-lg">
            Current Plan
          </span>
          <span className="text-sm font-medium text-[#8F8F8F]">
            <strong className="text-lg font-medium text-black">CHF0</strong>
            /Month
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-[45px] mt-[30px] ">
          <div className="flex flex-col">
            <article className="flex gap-x-2">
              <Image src={silvreIcon} alt="silvreIcon" />
              <span className="text-lg text-black font-medium">Silver</span>
            </article>

            <p className="mt-[25px] text-sm font-normal tetx-[#4B4B4B]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has a been the industry's
            </p>
          </div>

          <div>
            <section>
              <span className="text-[#4B4B4B] font-normal text-xs">
                Request:
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
              {planData.map((item, index) => (
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
                Change Membership
              </span>
            </button>
          </div>
        </div>
      </div>
    </SettingLayout>
  );
};

export default PlanComp;
