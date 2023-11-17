import React from "react";
import { Button } from "@/base-components/ui/button/button";
import followUpIcon from "@/assets/svgs/follow-up.svg";
import timeIcon from "@/assets/svgs/time.svg";
import idIcon from "@/assets/svgs/id.svg";
import Image from "next/image";

import useGeneralFollowUp from "@/hooks/follow-up/useGeneralFollowUp";

const FollowUpDropDown = () => {
  const { followUp, handleAddFollowUp, handleFollowUps, handleFollowUpsDetails, renderModal } = useGeneralFollowUp()

  return (
    <>
      <div className="bg-white rounded-md shadow-followUp w-[405px] absolute top-7 menuItems right-0 mt-1 ">
        <div className="flex justify-between items-center pt-5 pb-3 px-4 border-b-2 border-[#000] border-opacity-10">
          <h1 className="text-[#222B45] text-lg font-medium ">Follow Up</h1>
          <Button
            onClick={() => handleAddFollowUp()}
            id="button"
            inputType="button"
            text="Add Follow Up"
            className="text-white text-[13px] font-semibold rounded-md !h-8"
          />
        </div>
        {followUp?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleFollowUpsDetails()}
              className={`pt-[10px] px-4 cursor-pointer ${(index == 0 || index == 1) && "bg-primary"
                } bg-opacity-10 `}
            >
              <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10 ">
                <Image
                  src={followUpIcon}
                  alt="Follow Up Icon"
                  className="mr-6"
                />
                <div>
                  <div>
                    <span className="text-dark text-sm">
                      Up coming Follow up:
                    </span>
                    <span className="text-dark text-sm font-medium">
                      Call for information of cleaning and moving services
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center mr-7">
                      <Image
                        src={timeIcon}
                        alt="Time Icon"
                        className="mr-[10px]"
                      />
                      <span className="text-[#4B4B4B] text-[13px] ">
                        14:20:05,12/09/2023
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Image src={idIcon} alt="Id Icon" className="mr-[10px]" />
                      <span className="text-[#4B4B4B] text-[13px] ">
                        {item.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center py-4">
          <button
            className=" text-primary w-fit text-sm font-medium "
            onClick={() => handleFollowUps()}
          >
            View All
          </button>
        </div>
      </div>

      {renderModal()}
    </>
  );
};

export default FollowUpDropDown;
