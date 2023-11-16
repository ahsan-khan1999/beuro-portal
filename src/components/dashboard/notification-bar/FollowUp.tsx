import React from "react";
import followUpIcon from "@/assets/svgs/follow-up.svg";
import idIcon from "@/assets/svgs/id.svg";
import Image from "next/image";
import timeIcon from "@/assets/svgs/time.svg";
import dayIcon from "@/assets/svgs/day-icon.svg";

export const FollowUpNotificationBar = () => {
  const followUp = [
    {
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
  ];
  return (
    <div className="bg-white rounded-[20px]  w-[380px] max-h-[400px]     ">
      <div className=" pt-5 pb-3 px-4 border-b-2 border-[#000] border-opacity-10">
        <h1 className="text-[#18181B]  font-medium">Follow Ups</h1>
      </div>
      <div className="overflow-y-scroll max-h-[340px]">
        {followUp.map((item, index) => {
          return (
            <div
              key={index}
              className={`pt-[10px] px-4 cursor-pointer hover:bg-primary hover:bg-opacity-10  bg-opacity-10 `}
            >
              <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10 ">
                <Image
                  src={followUpIcon}
                  alt="Follow Up Icon"
                  className="mr-6"
                />
                <div>
                  <div>
                    <span className="text-dark text-sm">{item.title}: </span>
                    <span className="text-dark text-sm font-medium">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center ">
                      <Image
                        src={timeIcon}
                        alt="Time Icon"
                        className="mr-[6px]"
                      />
                      <span className="text-[#393939] text-xs ">
                        {item.time},{item.date}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Image src={idIcon} alt="Id Icon" className="mr-[6px]" />
                      <span className="text-[#4B4B4B] text-xs ">{item.id}</span>
                    </div>
                    <div className="flex items-center">
                      <Image src={dayIcon} alt="Id Icon" className="mr-[6px]" />
                      <span className="text-[#4B4B4B] text-xs ">
                        {item.day}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center py-4">
          <button className=" text-primary w-fit text-sm font-medium ">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};
