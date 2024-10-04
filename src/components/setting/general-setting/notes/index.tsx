import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import delIcon from "@/assets/pngs/address_del_icon.png";
import editIcon from "@/assets/pngs/address_edit_icon.png";
import Image from "next/image";
import { useState } from "react";
import { NoteSetting } from "@/api/slices/settingSlice/settings";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useTranslation } from "next-i18next";

export interface GeneralNotesProps {
  onAddNote: () => void;
  onEditNote: (
    id: string,
    note: { noteType: string; description: string }
  ) => void;
  onNoteDelete: (id: string, index: number) => void;
  noteSettings: NoteSetting[] | null;
  loading: boolean;
}

export const NotesDetailCard = ({
  onAddNote,
  onEditNote,
  onNoteDelete,
  noteSettings,
  loading,
}: GeneralNotesProps) => {
  const { t: translate } = useTranslation();
  const [openNoteIndex, setOpenNoteIndex] = useState<number | null>(null);
  const reversedNoteSettings = noteSettings?.slice().reverse() || [];

  const handleDescription = (index: number) => {
    setOpenNoteIndex(openNoteIndex === index ? null : index);
  };


  return (
    <div className="p-6 bg-white rounded-md">
      <div className="flex items-center justify-between pb-6 border-b border-b-[#000] border-opacity-10">
        <span className="text-xl text-[#1E1E1E] font-medium">
          {translate("setting.general_setting.notes")}
        </span>
        <Button
          inputType="button"
          onClick={onAddNote}
          className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          text={translate("common.add_new_notes")}
          icon={addIcon}
          id="new notes"
          iconAlt="new notes"
        />
      </div>

      {noteSettings && noteSettings?.length > 0 ? (
        loading ? (
          <CustomLoader />
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-3 items-center my-6">
              <span className="text-sm text-[#8F8F8F] font-medium col-span-2">
                {translate("common.title")}
              </span>
              <div className="col-span-1 flex items-center justify-between">
                <span className="text-sm text-[#8F8F8F] font-medium">
                  {translate("common.created_by")}
                </span>

                <span className="text-sm text-[#8F8F8F] font-medium flex items-center justify-start w-[110px]">
                  {translate("common.actions")}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              {reversedNoteSettings?.map((item, index) => (
                <div
                  className={`pt-3 border border-[#ccc] rounded-lg ${
                    openNoteIndex === index && "bg-[#EDF4FF]"
                  } hover:bg-[#EDF4FF]`}
                  key={index}
                  onClick={() => handleDescription(index)}
                >
                  <div
                    className={`grid grid-cols-3 items-center pb-[10px] mx-4  ${
                      openNoteIndex === index &&
                      "border-b border-b-[#000] border-opacity-20"
                    }`}
                  >
                    <span className="text-base font-medium text-[#4B4B4B] col-span-2 truncate">
                      {index + 1}:&nbsp; {item.notes.noteType}
                    </span>
                    <div className="col-span-1 flex items-center justify-between">
                      <span className="text-[#717171] text-base font-medium truncate">
                        {item?.createdBy?.fullName}
                      </span>
                      <div
                        className="flex items-center gap-x-5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Image
                          src={editIcon}
                          alt="edit notes"
                          className="cursor-pointer"
                          onClick={() => onEditNote(item?.id, item?.notes)}
                        />
                        <Image
                          src={delIcon}
                          alt="del note"
                          className="cursor-pointer"
                          onClick={() => onNoteDelete(item?.id, index)}
                        />
                      </div>
                    </div>
                  </div>

                  {openNoteIndex === index && (
                    <div className="bg-[#EDF4FF] rounded-lg py-3 px-4">
                      <p
                        className="text-base font-normal text-[#4B4B4B]"
                        dangerouslySetInnerHTML={{
                          __html: item?.notes?.description,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <NoDataEmptyState
          containerClassName="xMini:py-[153px] w-full flex items-center justify-center"
          className="py-5 px-3 xMini:py-10 xMini:px-6 w-[531px]"
        />
      )}
    </div>
  );
};
