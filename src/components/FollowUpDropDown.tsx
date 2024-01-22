import React from "react";
import { Button } from "@/base-components/ui/button/button";
import followUpIcon from "@/assets/svgs/follow-up.svg";
import timeIcon from "@/assets/svgs/time.svg";
import idIcon from "@/assets/svgs/id.svg";
import dateIcon from "@/assets/svgs/Vector-date.svg";
import deleteIcon from "@/assets/svgs/Vector-delete.svg";
import Image from "next/image";
import useGeneralFollowUp from "@/hooks/follow-up/useGeneralFollowUp";
import moment from "moment";
import { getDaysDifference } from "@/utils/utility";
import { AnimatePresence, motion } from "framer-motion";

const FollowUpDropDown = () => {
  const {
    followUp,
    handleAddFollowUp,
    handleFollowUps,
    handleFollowUpsDetails,
    renderModal,
    handleDeleteFollowUp,
    translate,
  } = useGeneralFollowUp();

  return (
    <>
      <div className="  bg-white rounded-md shadow-followUp w-[440px] absolute top-7 menuItems right-0 mt-1 !z-50 ">
        <div className="flex justify-between items-center pt-5 pb-3 px-4 border-b-2 border-[#000] border-opacity-10">
          <h1 className="text-[#222B45] text-lg font-medium ">
            {translate("follow_up.heading")}
          </h1>
          <Button
            onClick={() => handleAddFollowUp()}
            id="button"
            inputType="button"
            text={translate("follow_up.add_button")}
            className="text-white text-[13px] font-semibold rounded-md !h-8"
          />
        </div>
        <div className="max-h-[450px] overflow-y-auto">
          <AnimatePresence>
            {followUp?.map((item, index) => {
              let days = getDaysDifference(item.createdAt);
              return (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  key={index}
                  onClick={() => handleFollowUpsDetails(item.id)}
                  className={`relative pt-[10px] px-4 cursor-pointer ${
                    (index == 0 || index == 1) && "bg-primary"
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
                          {translate("follow_up.upcoming_follow_up")}:
                        </span>
                        <span className="text-dark text-sm font-medium">
                          {item.title}
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
                            {moment(item.dateTime).format(
                              "DD/MM/YYYY hh:mm:ss"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Image
                            src={idIcon}
                            alt="Id Icon"
                            className="mr-[10px]"
                          />
                          <span className="text-[#4B4B4B] text-[13px]">
                            {item?.customer?.refID}
                          </span>
                        </div>
                        {days > 0 && (
                          <div className="flex items-center">
                            <div className="ml-2 flex space-x-2">
                              <Image src={dateIcon} alt="Id Icon" />
                              <span className="text-[#4B4B4B] text-[13px]">
                                {days + " Day"}
                              </span>
                            </div>
                          </div>
                        )}
                        {days > 0 ? (
                          <div
                            className="flex items-center absolute right-5"
                            onClick={(e) => handleDeleteFollowUp(item.id, e)}
                          >
                            <div className="ml-2 border-2 border-red rounded-md p-1">
                              <Image
                                src={deleteIcon}
                                alt="Id Icon"
                                className=""
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {followUp?.length > 0 && (
            <div className="flex justify-center py-4">
              <button
                className=" text-primary w-fit text-sm font-medium "
                onClick={() => handleFollowUps()}
              >
                {translate("follow_up.view_all")}
              </button>
            </div>
          )}
        </div>
      </div>

      {renderModal()}
    </>
  );
};

export default FollowUpDropDown;
