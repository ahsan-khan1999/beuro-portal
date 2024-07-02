import React from "react";
import { Button } from "@/base-components/ui/button/button";
import useGeneralFollowUp from "@/hooks/follow-up/useGeneralFollowUp";
import moment from "moment";
import { getDaysDifference } from "@/utils/utility";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { BellIcon } from "@/assets/svgs/components/bell-icon";

const FollowUpDropDown = () => {
  const {
    followUp,
    handleAddFollowUp,
    handleFollowUps,
    handleFollowUpsDetails,
    renderModal,
    handleDeleteFollowUp,
    translate,
    handleMouseEnter,
    handleMouseLeave,
    hoveredIndex,
  } = useGeneralFollowUp();

  return (
    <>
      <div className="bg-white rounded-[20px] shadow-followUp w-[460px] absolute top-8 menuItems -right-[2px] mt-7 !z-50 follow-up-container pt-[25px] pb-[18px]">
        <div className="flex justify-between items-center px-[30px] mb-6">
          <h1 className="text-[#222B45] text-lg font-medium">
            {translate("follow_up.heading")}
          </h1>
          <Button
            onClick={() => handleAddFollowUp()}
            id="button"
            inputType="button"
            text={translate("follow_up.add_button")}
            className="text-white text-[13px] font-semibold rounded-md !h-8"
            icon={addIcon}
          />
        </div>

        <div className="max-h-[450px] overflow-y-auto">
          {followUp?.map((item, index) => {
            let days = getDaysDifference(item.createdAt);
            return (
              <div className="relative">
                <div
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={`flex items-start gap-x-6 pl-[30px] pr-[47px] pt-5 pb-6 border-b border-b-[#F5F5F5] ${
                    hoveredIndex === index ? "follow_up_item" : ""
                  }`}
                >
                  <BellIcon isHovered={hoveredIndex === index} />
                  <div className="flex flex-col gap-y-[14px]">
                    <p className="text-base font-medium text-[#171B1E]">
                      {item?.title}
                    </p>
                    <div className="flex items-center">
                      <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] pr-2">
                        {moment(item.dateTime).format("hh:mm")}
                      </span>
                      <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] px-2">
                        {moment(item.dateTime).format("DD/MM/YYYY")}
                      </span>
                      <span className="text-[#717579] font-normal text-sm border-r border-r-[#C4C4C4] px-2">
                        ID {item?.customer?.refID}
                      </span>
                      <span className="text-primary font-normal text-sm pl-2">
                        Days {days}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {followUp?.length > 0 && (
          <div className="flex justify-center pt-[14px]">
            <button
              className="text-[#616161] w-fit text-base font-medium"
              onClick={() => handleFollowUps()}
            >
              {translate("follow_up.view_all")}
            </button>
          </div>
        )}
      </div>
      {/* <div className="bg-white rounded-md shadow-followUp w-[460px] absolute top-8 menuItems right-0 mt-1 !z-50 follow-up-container">
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
                  <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10">
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
                          <span className="text-[#4B4B4B] text-[13px]">
                            {moment(item.dateTime).format(
                              "DD/MM/YYYY hh:mm:ss"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Image
                            src={licenseIcon}
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
                            className="flex items-center absolute right-5 top-4"
                            onClick={(e) => handleDeleteFollowUp(item.id, e)}
                            title="delete"
                          >
                            <Image src={deleteIcon} alt="Id Icon" />
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
                className=" text-primary w-fit text-sm font-medium"
                onClick={() => handleFollowUps()}
              >
                {translate("follow_up.view_all")}
              </button>
            </div>
          )}
        </div>
      </div> */}

      {renderModal()}
    </>
  );
};

export default FollowUpDropDown;
