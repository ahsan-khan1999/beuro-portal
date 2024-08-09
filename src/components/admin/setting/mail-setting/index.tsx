import React, { useState } from "react";
import SettingLayout from "../SettingLayout";
import MailSettingForm from "./mail-setting-form";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

const MailSetting = () => {
  const { t: translate } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<boolean>(false);

  const { modal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.update_setting")}
        modelSubHeading={translate("common.modals.admin_setting_des")}
        routeHandler={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleCreation = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  return (
    <SettingLayout containerClassName="pl-4 pr-4 mb-5">
      <div className={`flex items-center gap-x-3 ${selectedTab && "mb-10"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill={selectedTab ? "#4A13E7" : "#4B4B4B"}
        >
          <path d="M7.2208 0C3.31035 0 0.128906 3.18137 0.128906 7.0919C0.128906 11.0024 3.31035 14.1839 7.2208 14.1839C11.1313 14.1839 14.3127 11.0024 14.3127 7.0919C14.3127 3.18137 11.1313 0 7.2208 0ZM11.2931 5.89402L6.83762 10.3495C6.64817 10.5389 6.39634 10.6432 6.12845 10.6432C5.86056 10.6432 5.60873 10.5389 5.41928 10.3495L3.14851 8.07872C2.95906 7.88927 2.85472 7.63744 2.85472 7.36955C2.85472 7.10159 2.95906 6.84976 3.14851 6.66031C3.33788 6.47087 3.58971 6.36652 3.85768 6.36652C4.12557 6.36652 4.37747 6.47087 4.56685 6.66039L6.12838 8.22184L9.87461 4.47561C10.0641 4.28616 10.3159 4.18189 10.5838 4.18189C10.8517 4.18189 11.1035 4.28616 11.2929 4.47561C11.6841 4.86678 11.6841 5.50299 11.2931 5.89402Z" />
        </svg>
        <span
          onClick={() => setSelectedTab(!selectedTab)}
          className="text-[#4B4B4B] text-base font-normal cursor-pointer"
        >
          {translate("setting.mail_setting.own_config")}
        </span>
      </div>

      {selectedTab && (
        <MailSettingForm handleCreation={handleCreation} selectedTab={1} />
      )}

      {renderModal()}
    </SettingLayout>
  );
};

export default MailSetting;
