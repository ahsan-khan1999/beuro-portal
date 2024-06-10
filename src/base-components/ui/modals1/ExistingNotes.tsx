import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";
import { formatDateReverse } from "@/utils/utility";
import { OffersTableRowTypes } from "@/types/offers";
import { contractTableTypes } from "@/types/contract";
import { InvoiceTableRowTypes } from "@/types/invoice";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { BaseButton } from "../button/base-button";
import editNoteIcon from "@/assets/svgs/edit_primary.svg";
import deleteIcon from "@/assets/pngs/delet-icon.png";

const ExistingNotes = ({
  handleAddNote,
  onEditNote,
  onConfrimDeleteNote,
  onClose,
  leadDetails,
}: {
  handleAddNote: (id: string, refID: string, name: string) => void;
  onEditNote: (id: string, note: string, refID: string, name: string) => void;
  onConfrimDeleteNote: (id: string) => void;
  onClose: () => void;
  leadDetails:
    | Lead
    | OffersTableRowTypes
    | contractTableTypes
    | InvoiceTableRowTypes;
}) => {
  const { notes } = useAppSelector((state) => state.note);
  const { refID, name } = useAppSelector((state) => state.global.modal.data);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] xl:max-w-[624px]"
    >
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

          <div className="flex justify-between items-center gap-[10px]">
            <BaseButton
              onClick={() => handleAddNote(leadDetails?.id, refID, name)}
              buttonText={translate("common.notes_modal.button")}
              containerClassName="flex items-center group gap-x-3 row-reverse bg-primary hover:bg-buttonHover"
              textClassName="text-white font-medium"
            />
          </div>
        </div>

        <div className="border-y border-y-[#000] border-opacity-10 py-[10px] mx-10 mb-[46px]">
          <div className="flex items-center gap-x-[34px]">
            <div className="flex items-center gap-x-[14px]">
              <span className="text-sm font-normal text-[#4D4D4D]">ID:</span>
              <span className="text-sm font-medium text-primary">{refID}</span>
            </div>
            <div className="flex items-center gap-x-[14px]">
              <span className="text-sm font-normal text-[#4D4D4D]">
                {translate("common.customer_name")}:
              </span>
              <span className="text-sm font-medium text-primary">{name}</span>
            </div>
          </div>
        </div>

        {notes && notes?.length > 0 ? (
          <div className="h-[550px] overflow-y-auto overflow-x-hidden">
            {notes?.map((item, key) => (
              <div
                className={`mb-[10px] ${
                  notes?.length - 1 !== key && "border-b-[1px] border-lightGray"
                } pb-3 `}
                key={key}
              >
                <div className="flex items-center justify-between mx-[41px] mb-[8px]">
                  <p className="text-[#8F8F8F] text-[14px] font-normal">
                    Created by &nbsp;
                    <span className="text-[#1E1E1E] text-base font-normal">
                      {item.createdBy?.fullName}
                    </span>
                  </p>
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={editNoteIcon}
                      alt="edit note"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() =>
                        onEditNote(item?.id, item?.description, refID, name)
                      }
                    />
                    <Image
                      src={deleteIcon}
                      alt="delete note"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => onConfrimDeleteNote(item?.id)}
                    />
                  </div>
                </div>

                <div className="relative mx-[41px] border border-[#4B4B4B] rounded-lg">
                  <p className="text-primary text-sm font-normal absolute bottom-2 left-2">
                    {item?.noteType}
                  </p>
                  <div
                    className="text-[#4B4B4B] text-base font-normal p-[17px] break-all"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                  <div className="p-2 flex justify-end text-sm text-primary">
                    {formatDateReverse(item?.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <NoDataEmptyState className="w-fit" containerClassName="py-5" />
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default ExistingNotes;
