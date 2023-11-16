import React, { useState } from "react";
import { Button } from "@/base-components/ui/button/button";
import followUpIcon from "@/assets/svgs/follow-up.svg";
import timeIcon from "@/assets/svgs/time.svg";
import idIcon from "@/assets/svgs/id.svg";
import Image from "next/image";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import FollowUps from "@/base-components/ui/modals1/FollowUps";
import { updateModalType } from "@/api/slices/globalSlice/global";
import FollowUpDetails from "@/base-components/ui/modals1/FollowUpDetails";
import AddPostPonedNote from "@/base-components/ui/modals1/AddPostPonedNote";
import AddRemarks from "@/base-components/ui/modals1/AddRemarks";
import AddFollowUp from "@/base-components/ui/modals1/AddFollowUp";
import AllCustomers from "@/base-components/ui/modals1/AllCustomers";
import AllLeads from "@/base-components/ui/modals1/AllLeads";
import FollowUpCustomersDetails from "@/base-components/ui/modals1/FollowUpCustomersDetails";
import FollowUpServiceDetails from "@/base-components/ui/modals1/FollowUpServiceDetails";

const FollowUpDropDown = () => {
  const followUp = [
    { id: "00071" },
    { id: "00045" },
    { id: "00075" },
    { id: "00034" },
    { id: "00082" },
    { id: "00025" },
  ];
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const [status, setStatus] = useState({
    postpond: false,
    completed: false,
    neutral: true,
  });

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleFollowUps = () => {
    dispatch(updateModalType(ModalType.FOLLOW_UPS));
  };

  const handleFollowUpsDetails = () => {
    dispatch(updateModalType(ModalType.FOLLOW_UPS_DETAILS));
  };

  const handleAddPostPonedNote = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.ADD_POSTSPONED_NOTE));
    setStatus({
      postpond: true,
      completed: false,
      neutral: false,
    });
  };

  const handleAddRemarks = () => {
    dispatch(updateModalType(ModalType.ADD_REMARKS));
    setStatus({
      postpond: false,
      completed: true,
      neutral: false,
    });
  };

  const handleAddFollowUp = () => {
    dispatch(updateModalType(ModalType.ADD_FOLLOW_UP));
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
      <div className="bg-white rounded-md shadow-followUp w-[405px] absolute top-3 menuItems right-0 mt-1 ">
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
        {followUp.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleFollowUpsDetails()}
              className={`pt-[10px] px-4 cursor-pointer ${
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
