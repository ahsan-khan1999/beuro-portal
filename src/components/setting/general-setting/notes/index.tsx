import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import delIcon from "@/assets/pngs/address_del_icon.png";
import editIcon from "@/assets/pngs/address_edit_icon.png";
import Image from "next/image";

export interface GeneralNotesProps {
  onAddNote: () => void;
  onEditNote: (id: string) => void;
  onNoteDelete: (id: string, index: number) => void;
}

export const NotesDetailCard = ({
  onAddNote,
  onEditNote,
  onNoteDelete,
}: GeneralNotesProps) => {
  return (
    <div className="p-6 bg-white rounded-md">
      <div className="flex items-center justify-between pb-6 border-b border-b-[#000] border-opacity-10">
        <span className="text-xl text-[#1E1E1E] font-normal">
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
          <div className="py-3 px-4 border border-[#ccc] rounded-lg hover:bg-[#EDF4FF] grid grid-cols-3 items-center">
            <span className="text-base font-medium text-[#4B4B4B] col-span-2 truncate">
              1:&nbsp; New house address
            </span>
            <div className="col-span-1 flex items-center justify-between">
              <span className="text-[#717171] text-base font-medium truncate">
                Marvin Mckinney
              </span>
              <div className="flex items-center gap-x-5">
                <Image
                  src={editIcon}
                  alt="edit notes"
                  className="cursor-pointer"
                  onClick={() => onEditNote("dd")}
                />
                <Image
                  src={delIcon}
                  alt="del note"
                  className="cursor-pointer"
                  onClick={() => onNoteDelete("As", 0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
