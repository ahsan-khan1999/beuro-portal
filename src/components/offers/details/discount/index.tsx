import React from "react";
import Image from "next/image";
import timeIcon from "@/assets/svgs/time.svg";
import calenderIcon from "@/assets/svgs/calender_with_point.svg";

const Discounts = () => {
  type ActivityTypes = {
    activityName: string;
    activityMode: string;
    activeTime: string;
    activeDate: string;
  };

  const activityData: ActivityTypes[] = [
    {
      activityName: "Ahmed Rahal Ali",
      activityMode: "edited Offer:",
      activeTime: "13:30:20",
      activeDate: "12/09/2023",
    },
    {
      activityName: "Ahmed Rahal Ali",
      activityMode: "edited Offer:",
      activeTime: "13:30:20",
      activeDate: "12/09/2023",
    },
    {
      activityName: "Ahmed Rahal Ali",
      activityMode: "edited Offer:",
      activeTime: "13:30:20",
      activeDate: "12/09/2023",
    },
    {
      activityName: "Ahmed Rahal Ali",
      activityMode: "edited Offer:",
      activeTime: "13:30:20",
      activeDate: "12/09/2023",
    },
    {
      activityName: "Ahmed Rahal Ali",
      activityMode: "edited Offer:",
      activeTime: "13:30:20",
      activeDate: "12/09/2023",
    },
  ];

  return (
    <div className="flex flex-col bg-white rounded-b-lg">
      {/* first item */}
      <div className="flex flex-col gap-[3px]">
        <span className="text-[#4B4B4B] text-[12px] font-normal">Discount</span>
        <div>
          <span className="text-[#4B4B4B] text-[13px] font-medium border border-[#C7C7C7] rounded-md">
            5000CHF
          </span>
          <button className="text-[#4B4B4B] text-[13px] font-medium border bg-[#4A13E7] rounded-md">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
