import React, { useState } from "react";
import idIcon from "@/assets/svgs/id.svg";
import Image from "next/image";
import timeIcon from "@/assets/svgs/time.svg";
import dayIcon from "@/assets/svgs/day-icon.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import FollowUps from "@/base-components/ui/modals1/FollowUps";
import FollowUpDetails from "@/base-components/ui/modals1/FollowUpDetails";
import AddPostPonedNote from "@/base-components/ui/modals1/AddPostPonedNote";
import AddRemarks from "@/base-components/ui/modals1/AddRemarks";
import AddFollowUp from "@/base-components/ui/modals1/AddFollowUp";
import AllCustomers from "@/base-components/ui/modals1/AllCustomers";
import AllLeads from "@/base-components/ui/modals1/AllLeads";
import FollowUpCustomersDetails from "@/base-components/ui/modals1/FollowUpCustomersDetails";
import FollowUpServiceDetails from "@/base-components/ui/modals1/FollowUpServiceDetails";
import { readFollowUpDetail } from "@/api/slices/followUp/followUp";
import { useTranslation } from "next-i18next";
import { Dashboard } from "@/types";
import {
  formatDateTimeToDate,
  formatDateTimeToTime,
  getDaysDifference,
} from "@/utils/utility";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

export const FollowUpNotificationBar = ({
  dashboard,
}: {
  dashboard: Dashboard | null;
}) => {
  const followUp = dashboard?.["FollowUp"]?.map((item) => ({
    title: item?.title,
    time: formatDateTimeToTime(item?.dateTime),
    date: formatDateTimeToDate(item?.dateTime),
    id: item?.refID,
    day: getDaysDifference(item?.dateTime),
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
  <path d="M8.99398 7.0114C8.99398 6.49518 9.41243 6.07673 9.92864 6.07673H18.9014C20.1415 6.12608 20.1406 7.89713 18.9014 7.94606H9.92864C9.41243 7.94606 8.99398 7.52761 8.99398 7.0114ZM12.1718 17.6198H9.92864C8.68854 17.6692 8.68947 19.4402 9.92864 19.4891H12.1718C13.4119 19.4398 13.411 17.6687 12.1718 17.6198ZM9.92864 13.554H14.9291C16.1692 13.5047 16.1683 11.7336 14.9291 11.6847H9.92864C8.68854 11.7341 8.68947 13.5051 9.92864 13.554ZM6.19 11.6847C5.67379 11.6847 5.25534 12.1032 5.25534 12.6194C5.30459 13.8592 7.07564 13.8588 7.12466 12.6194C7.12466 12.1032 6.70621 11.6847 6.19 11.6847ZM24.5094 20.9925C24.5098 22.4345 23.4014 23.8238 21.8877 23.7886H19.9295C19.878 25.0288 18.1113 25.0279 18.0602 23.7886H16.0553C14.5414 23.8238 13.4332 22.4342 13.4337 20.9925C13.4337 20.59 13.6656 20.2418 14.0468 20.1147C14.1495 20.0727 14.7831 19.784 14.7831 19.0545V18.1339C14.7831 16.1441 16.1898 14.4581 18.0602 14.0324V13.4138C18.1096 12.1737 19.8806 12.1747 19.9296 13.4138V14.0434C21.7766 14.4863 23.16 16.1607 23.16 18.1339V19.0545C23.16 19.784 23.7936 20.0727 23.8963 20.1147C24.2774 20.2417 24.5094 20.59 24.5094 20.9925ZM22.5239 21.4719C21.9052 21.0169 21.2906 20.2286 21.2906 19.0545V18.1339C21.2906 16.8631 20.2582 15.8153 18.9892 15.7983C18.9833 15.7983 18.9774 15.7981 18.9715 15.798C18.9656 15.7981 18.9597 15.7983 18.9538 15.7983C17.6848 15.8153 16.6524 16.8631 16.6524 18.1339V19.0545C16.6524 20.2286 16.0378 21.0169 15.4191 21.4719C15.52 21.6981 15.7077 21.9192 16.0553 21.9192H21.8877C22.2353 21.9192 22.423 21.6981 22.5239 21.4719ZM6.19 6.07673C5.67379 6.07673 5.25534 6.49518 5.25534 7.0114C5.30459 8.25122 7.07564 8.25085 7.12466 7.0114C7.12466 6.49518 6.70621 6.07673 6.19 6.07673ZM6.19 17.6198C5.67379 17.6198 5.25534 18.0382 5.25534 18.5545C5.30459 19.7943 7.07564 19.7939 7.12466 18.5545C7.12466 18.0382 6.70621 17.6198 6.19 17.6198ZM20.7707 0.795898H4.32068C2.25919 0.795898 0.582031 2.47305 0.582031 4.53454V20.9846C0.582031 23.0461 2.25919 24.7232 4.32068 24.7232H11.4241C12.6642 24.6739 12.6633 22.9028 11.4241 22.8539H4.32068C3.28993 22.8539 2.45135 22.0153 2.45135 20.9846V4.53454C2.45135 3.5038 3.28993 2.66522 4.32068 2.66522H20.7707C21.8015 2.66522 22.64 3.5038 22.64 4.53454V12.9465C22.6894 14.1866 24.4604 14.1857 24.5094 12.9465V4.53454C24.5094 2.47305 22.8322 0.795898 20.7707 0.795898Z" fill="url(#paint0_linear_2051_43668)"/>
  <defs>
    <linearGradient id="paint0_linear_2051_43668" x1="12.5556" y1="3.77479" x2="12.5556" y2="15.9805" gradientUnits="userSpaceOnUse">
      <stop offset="5.32779e-09" stop-color="#4A13E7"/>
      <stop offset="1" stop-color="#7B18FF"/>
    </linearGradient>
  </defs>
</svg>`,
  }));
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { followUpDetails } = useAppSelector((state) => state.followUp);

  const [status, setStatus] = useState({
    postpond: false,
    completed: false,
    neutral: true,
  });

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleFollowUps = () => {
    dispatch(updateModalType({ type: ModalType.FOLLOW_UPS }));
  };

  const handleFollowUpsDetails = (id: string) => {
    if (id) dispatch(readFollowUpDetail({ params: { filter: id } }));
    dispatch(updateModalType({ type: ModalType.FOLLOW_UPS_DETAILS, data: id }));
  };

  const handleAddPostPonedNote = () => {
    dispatch(updateModalType({ type: ModalType.ADD_POSTSPONED_NOTE }));
    // setStatus({
    //   postpond: true,
    //   completed: false,
    //   neutral: false,
    // });
  };

  const handleAddRemarks = () => {
    dispatch(updateModalType({ type: ModalType.ADD_REMARKS }));
  };

  const handleAllCustomers = () => {
    dispatch(updateModalType(ModalType.ALL_CUSTOMERS_LIST));
  };

  const handleCustomerDetail = () => {
    dispatch(updateModalType(ModalType.SELECTED_CUSTOMER_DETAIL));
  };

  const handleAllLeads = () => {
    dispatch(updateModalType(ModalType.ALL_LEADS_LIST));
  };

  const handleLeadDetail = () => {
    dispatch(updateModalType(ModalType.SELECTED_LEADS_DETAIL));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.FOLLOW_UPS]: (
      <FollowUps
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.FOLLOW_UPS_DETAILS]: (
      <FollowUpDetails
        onClose={onClose}
        handleAddPostPonedNote={handleAddPostPonedNote}
        handleAddRemarks={handleAddRemarks}
        status={status}
        followUpDetails={followUpDetails}
      />
    ),
    [ModalType.ADD_POSTSPONED_NOTE]: (
      <AddPostPonedNote
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.ADD_REMARKS]: (
      <AddRemarks
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.ADD_FOLLOW_UP]: (
      <AddFollowUp
        onClose={onClose}
        handleFollowUps={handleFollowUps}
        handleAllCustomers={handleAllCustomers}
        handleAllLeads={handleAllLeads}
      />
    ),
    [ModalType.ALL_CUSTOMERS_LIST]: (
      <AllCustomers
        onClose={onClose}
        handleCustomerDetail={handleCustomerDetail}
      />
    ),
    [ModalType.ALL_LEADS_LIST]: (
      <AllLeads onClose={onClose} handleLeadDetail={handleLeadDetail} />
    ),
    [ModalType.SELECTED_CUSTOMER_DETAIL]: (
      <FollowUpCustomersDetails onClose={onClose} />
    ),
    [ModalType.SELECTED_LEADS_DETAIL]: (
      <FollowUpServiceDetails onClose={onClose} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <div className="bg-white rounded-[20px] h-[397.089px]">
        <h1 className=" mb-3 ml-[40px] pt-5 text-[#18181B] font-medium">
          {translate("dashboard_detail.follow_up_heading")}
        </h1>

        <hr className="opacity-20" />
        {followUp && followUp?.length > 0 ? (
          <div className="overflow-y-scroll max-h-[340px] dashboard_scrollbar pl-5 pr-[5px] pb-[14px] mr-1">
            {followUp?.map((item, index) => {
              return (
                <div
                  onClick={() => handleFollowUpsDetails(item.id)}
                  key={index}
                  className={`pt-[10px] px-4 cursor-pointer hover:bg-primary hover:bg-opacity-10  bg-opacity-10 `}
                >
                  <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10 ">
                    <div
                      className="mr-6"
                      dangerouslySetInnerHTML={{ __html: item.svg }}
                    />
                    <div>
                      <div>
                        <span className="text-dark text-sm">
                          {item.title}:{" "}
                        </span>
                      </div>
                      <div className="flex items-center justify-between space-x-3 mt-1">
                        <div className="flex ">
                          <Image
                            src={timeIcon}
                            alt="Time Icon"
                            className="mr-[6px]"
                          />
                          <span className="text-[#393939] text-xs ">
                            {item.time},{item.date}
                          </span>
                        </div>
                        <div className="flex">
                          <Image
                            src={idIcon}
                            alt="Id Icon"
                            className="mr-[6px]"
                          />
                          <span className="text-[#4B4B4B] text-xs ">
                            {item.id}
                          </span>
                        </div>
                        <div className="flex ">
                          <Image
                            src={dayIcon}
                            alt="Id Icon"
                            className="mr-[6px]"
                          />
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

            {followUp && followUp?.length > 0 && (
              <div className="flex justify-center py-4">
                <button
                  onClick={() => handleFollowUps()}
                  className=" text-primary w-fit text-sm font-medium "
                >
                  {translate("dashboard_detail.view_all")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <NoDataEmptyState />
        )}
      </div>
      {renderModal()}
    </>
  );
};