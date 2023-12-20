import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import addNewNote from "@/assets/svgs/add_new_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";
import { formatDateReverse } from "@/utils/utility";
import { OffersTableRowTypes } from "@/types/offers";
import { contractTableTypes } from "@/types/contract";
import { InvoiceTableRowTypes } from "@/types/invoice";
import { useTranslation } from "next-i18next";
import { useEmptyStates } from "@/utils/hooks";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const ExistingNotes = ({
  handleAddNote,
  onClose,
  leadDetails,
}: {
  handleAddNote: (id: string) => void;
  onClose: () => void;
  leadDetails:
    | Lead
    | OffersTableRowTypes
    | contractTableTypes
    | InvoiceTableRowTypes;
}) => {
  const { notes } = useAppSelector((state) => state.note);
  const { t: translate } = useTranslation();

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] xl:max-w-[624px] min-h-[400px] h-fit dashboard_scrollbar">
        <div className="relative flex flex-col pt-[22px] xl:pb-[50px] pb-4">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex justify-between items-center mb-[19px] ml-[38px] mr-[56px]">
            <p className="text-2xl font-medium text-[#000]">
              {translate("common.notes_modal.heading")}
            </p>
            <div className="flex justify-between items-center gap-[10px] ">
              <Image
                src={addNewNote}
                alt="request_submitted"
                onClick={() => handleAddNote(leadDetails?.id)}
                className="cursor-pointer"
              />
              <p className="text-[#4B4B4B] text-base">
                {translate("common.notes_modal.button")}
              </p>
            </div>
          </div>

          <span className="mb-[13px] w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="651"
              height="3"
              viewBox="0 0 651 3"
              fill="none">
              <path
                opacity="0.1"
                d="M0.585938 1.06348L650.043 1.06342"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </span>
          {notes?.length > 0 ? (
            <>
              {notes?.map((item, key) => (
                <div
                  className={` mb-[10px]  ${
                    notes?.length - 1 !== key &&
                    "border-b-[1px] border-lightGray "
                  }pb-3 `}
                  key={key}>
                  <p className="mx-[41px] text-[#8F8F8F] text-[14px] font-normal mb-[8px]">
                    Created by &nbsp;
                    <span className="text-[#1E1E1E] text-base font-normal">
                      {item.createdBy?.fullName}
                    </span>
                  </p>

                  <div className="mx-[41px] border border-[#4B4B4B] rounded-lg">
                    <div
                      className="text-[#4B4B4B]  text-base font-normal p-[17px]"
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                    <div className="p-2 flex justify-end text-sm text-lightGray">
                      {formatDateReverse(item?.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
           <div className="flex justify-center items-center">
             <NoDataEmptyState />
           </div>
          )}
        </div>
      </BaseModal>
    </>
  );
};

export default ExistingNotes;
