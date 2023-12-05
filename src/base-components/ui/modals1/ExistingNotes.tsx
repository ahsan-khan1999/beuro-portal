import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import addNewNote from "@/assets/svgs/add_new_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";
import {  formatDateReverse } from "@/utils/utility";
import { OffersTableRowTypes } from "@/types/offers";

const ExistingNotes = ({
  handleAddNote,
  onClose,
  leadDetails
}: {
  handleAddNote: (id: string) => void;
  onClose: () => void;
  leadDetails: Lead | OffersTableRowTypes
}) => {
  const { notes } = useAppSelector(state => state.note)
  
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col ">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex justify-between items-center mb-[19px] mt-[30px] mx-[38px]">
            <p className="text-[24px] leading-6 font-medium text-[#000]">
              Notes
            </p>
            <div className="flex justify-between items-center gap-[10px] ">
              <Image
                src={addNewNote}
                alt="request_submitted"
                onClick={() => handleAddNote(leadDetails?.id)}
                className="cursor-pointer"
              />
              <p className="text-[#4B4B4B] text-base">Add New Note</p>
            </div>
          </div>

          <span className="mb-[13px] w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="651"
              height="3"
              viewBox="0 0 651 3"
              fill="none"
            >
              <path
                opacity="0.1"
                d="M0.585938 1.06348L650.043 1.06342"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </span>
          {
            notes?.map((item, key) => (
              <div className={` mb-[10px]  ${notes?.length -1 !== key && 'border-b-[1px] border-lightGray '}pb-3 `} key={key}>
                <p className="mx-[41px] text-[#8F8F8F] text-[14px] font-normal mb-[8px]">
                  Created by &nbsp;
                  <span className="text-[#1E1E1E] text-base font-normal">
                    {item.createdBy?.fullName}
                  </span>
                </p>

                <div className="mx-[41px] border border-[#4B4B4B] rounded-lg">
                  <div className="text-[#4B4B4B]  text-base font-normal p-[17px]" dangerouslySetInnerHTML={{ __html: item?.description }} />
                  <div className="p-2 flex justify-end text-sm text-lightGray">
                    {formatDateReverse(item?.createdAt)}
                  </div>
                </div>
              </div>

            ))
          }

        </div>
      </BaseModal>
    </>
  );
};

export default ExistingNotes;
