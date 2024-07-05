import React from "react";
import { Button } from "@/base-components/ui/button/button";
import useGeneralFollowUp from "@/hooks/follow-up/useGeneralFollowUp";
import moment from "moment";
import { getDaysDifference } from "@/utils/utility";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { BellIcon } from "@/assets/svgs/components/bell-icon";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const FollowUpDropDown = () => {
  const {
    handleAddFollowUp,
    handleFollowUps,
    renderModal,
    translate,
    handleMouseEnter,
    handleMouseLeave,
    hoveredIndex,
    followUpTableData,
    todayFollowUps,
  } = useGeneralFollowUp();

  const viewAllData = followUpTableData.map(
    (item) => item.status === "Pending"
  );

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

        <div className="max-h-[450px] overflow-y-auto dashboard_scrollbar">
          {todayFollowUps.length > 0 ? (
            todayFollowUps.map((item, index) => {
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
            })
          ) : (
            <NoDataEmptyState
              className="w-[90%] mx-auto my-3"
              containerClassName="py-0"
            />
          )}
        </div>
        {viewAllData?.length > 0 && (
          <div className="flex justify-center pt-[14px] border-t border-t-primary">
            <button
              className="text-[#616161] w-fit text-base font-medium hover:text-primary"
              onClick={() => handleFollowUps()}
            >
              {translate("follow_up.view_all")}
            </button>
          </div>
        )}
      </div>

      {renderModal()}
    </>
  );
};

export default FollowUpDropDown;
