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
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { useEmptyStates } from "@/utils/hooks";
import LoadingState from "@/base-components/loadingEffect/loading-state";

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
  const { notes, loading } = useAppSelector((state) => state.note);
  const { t: translate } = useTranslation();

  const currentComponent = useEmptyStates(
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] xl:max-w-[624px] "
    >
      <div className="relative flex flex-col pt-[22px] xl:pb-[50px] pb-4 h-[615px] overflow-y-auto overflow-x-hidden">
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
        {notes && notes?.length > 0 ? (
          <>
            {notes?.map((item, key) => (
              <div
                className={` mb-[10px]  ${
                  notes?.length - 1 !== key &&
                  "border-b-[1px] border-lightGray "
                }pb-3 `}
                key={key}
              >
                <p className="mx-[41px] text-[#8F8F8F] text-[14px] font-normal mb-[8px]">
                  Created by &nbsp;
                  <span className="text-[#1E1E1E] text-base font-normal">
                    {item.createdBy?.fullName}
                  </span>
                </p>

                <div className="mx-[41px] border border-[#4B4B4B] rounded-lg">
                  <div
                    className="text-[#4B4B4B]  text-base font-normal p-[17px] break-all"
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
    </BaseModal>,
    notes?.length > 0,
    loading
  );

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] xl:max-w-[624px] "
    >
      <div className="relative flex flex-col pt-[22px] xl:pb-[50px] pb-4 h-[615px] overflow-y-auto overflow-x-hidden">
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
            <svg
              onClick={() => handleAddNote(leadDetails?.id)}
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
            >
              <rect
                x="1.12305"
                y="0.670898"
                width="39"
                height="39"
                rx="7.5"
                fill="white"
                stroke="#4A13E7"
              />
              <path
                d="M28.6242 19.4926H21.3018V12.1702C21.3018 11.7957 20.9982 11.4922 20.6238 11.4922C20.2493 11.4922 19.9458 11.7957 19.9458 12.1702V19.4926H12.6233C12.2489 19.4926 11.9453 19.7962 11.9453 20.1707C11.9453 20.5451 12.2489 20.8487 12.6233 20.8487H19.9458V28.1711C19.9458 28.5456 20.2493 28.8491 20.6238 28.8491C20.9982 28.8491 21.3018 28.5456 21.3018 28.1711V20.8487H28.6242C28.9987 20.8487 29.3022 20.5451 29.3022 20.1707C29.3022 19.7962 28.9987 19.4926 28.6242 19.4926Z"
                fill="#4A13E7"
              />
            </svg>
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

        {notes && notes?.length > 0 ? (
          <>
            {notes?.map((item, key) => (
              <div
                className={` mb-[10px]  ${
                  notes?.length - 1 !== key &&
                  "border-b-[1px] border-lightGray "
                }pb-3 `}
                key={key}
              >
                <p className="mx-[41px] text-[#8F8F8F] text-[14px] font-normal mb-[8px]">
                  Created by &nbsp;
                  <span className="text-[#1E1E1E] text-base font-normal">
                    {item.createdBy?.fullName}
                  </span>
                </p>

                <div className="mx-[41px] border border-[#4B4B4B] rounded-lg">
                  <div
                    className="text-[#4B4B4B]  text-base font-normal p-[17px] break-all"
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
  );
};

export default ExistingNotes;
