import { GeneralSettingComponentType } from "@/enums/setting";
import { useState } from "react";
import SettingLayout from "../SettingLayout";
import { AddressDetailCard } from "./address";
import { NotesDetailCard } from "./notes";
import { Button } from "@/base-components/ui/button/button";
import { NoteSetting } from "@/api/slices/settingSlice/settings";

export interface GeneralSettingProps {
  onAddAddressTitle: () => void;
  onEditAddressTitle: (id: string) => void;
  onAddNote: () => void;
  onEditNote: (id: string) => void;
  onAddressDelete: (id: string, index: number) => void;
  onNoteDelete: (id: string, index: number) => void;
  noteSettings: NoteSetting[] | null
}

export const GeneralSetting = ({
  onAddAddressTitle,
  onEditAddressTitle,
  onAddNote,
  onEditNote,
  onAddressDelete,
  onNoteDelete,
  noteSettings
}: GeneralSettingProps) => {
  const [currentComponent, setCurrentComponent] =
    useState<GeneralSettingComponentType>(GeneralSettingComponentType.ADDRESS);

  const handleChangedComponent = (component: GeneralSettingComponentType) => {
    setCurrentComponent(component);
  };

  const componentLookup = {
    [GeneralSettingComponentType.ADDRESS]: (
      <AddressDetailCard
        onAddAddressTitle={onAddAddressTitle}
        onEditAddressTitle={onEditAddressTitle}
        onAddressDelete={onAddressDelete}
      />
    ),
    [GeneralSettingComponentType.NOTES]: (
      <NotesDetailCard
        onAddNote={onAddNote}
        onEditNote={onEditNote}
        onNoteDelete={onNoteDelete}
        noteSettings={noteSettings}
      />
    ),
  };

  return (
    <div>
      <SettingLayout containerClassName="pl-[31px] mt-6 mb-5 space-x-6">
        <button
          className={`text-base font-medium py-2 px-3 ${
            currentComponent === GeneralSettingComponentType.ADDRESS
              ? "text-[#4A13E7] border border-primary rounded-[20px]"
              : "text-[#4B4B4B]"
          }`}
          onClick={() =>
            handleChangedComponent(GeneralSettingComponentType.ADDRESS)
          }
        >
          {translate("setting.general_setting.address")}
        </button>
        <button
          className={`text-base font-medium py-2 px-3 ${
            currentComponent === GeneralSettingComponentType.NOTES
              ? "text-[#4A13E7] border border-primary rounded-[20px]"
              : "text-[#4B4B4B]"
          }`}
          onClick={() =>
            handleChangedComponent(GeneralSettingComponentType.NOTES)
          }
        >
          {translate("setting.general_setting.notes")}
        </button>
      </SettingLayout>

      {componentLookup[currentComponent]}

      {currentComponent === GeneralSettingComponentType.ADDRESS && (
        <Button
          id="setting"
          inputType="button"
          className="mt-5 px-4 text-white text-base font-medium rounded-md bg-[#4A13E7] float-right"
          text={translate("setting.save_setting")}
          // loading={loading}
          // onClick={handleSaveSetings}
        />
      )}
    </div>
  );
};
