import React, { useState } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
import ChangePassword from "@/base-components/ui/modals1/ChangePassword";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { Layout } from "@/layout";
import { useDispatch } from "react-redux";
import SettingTopDataButtons from "./SettingTopDataButtons";
import SettingDetailsForm from "./SettingDetailsForm";
import SystemSettingDetails from "./system-setting/SystemSettingDetails";

const Setting = () => {
  const [switchDetails, setSwitchDetails] = useState(0);
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE]: <ChangePassword onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleChangePassword = () => {
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE));
  };

  return (
    <>
      <Layout>
        <h1 className="text-[#222B45] font-normal text-xl">Setting</h1>
        <div className="mt-[22px]">
          <SettingTopDataButtons
            switchDetails={switchDetails}
            setSwitchDetails={setSwitchDetails}
          />
        </div>

        <div className="mt-4">
          {switchDetails === 0 ? <SettingDetailsForm /> : null}
        </div>
        <div className="mt-4">
          {switchDetails === 1 ? (
            <SystemSettingDetails handleChangePassword={handleChangePassword} />
          ) : null}
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default Setting;
