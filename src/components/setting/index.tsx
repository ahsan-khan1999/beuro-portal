import React, { useEffect, useState } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
import ChangePassword from "@/base-components/ui/modals1/ChangePassword";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import SettingTopDataButtons from "./SettingTopDataButtons";
import SystemSettingDetails from "./system-setting/SystemSettingDetails";
import AddTax from "@/base-components/ui/modals1/AddTax";
import MailSetting from "./mail-setting";
import EditPaymentDetails from "@/base-components/ui/modals1/EditPaymentDetails";
import Templates from "./templates";
import FollowUpSetting from "./follow-up-setting";
import SettingProfile from "./profile-form";
import { useTranslation } from "next-i18next";
import QRSettings from "./qr-settings";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { useRouter } from "next/router";
import { GeneralSetting } from "./general-setting";
import { AddGeneralAddress } from "@/base-components/ui/modals1/GeneralAddressTitle";
import { GeneralSuccess } from "@/base-components/ui/modals1/GeneralSuccess";
import { GeneralNote } from "@/base-components/ui/modals1/AddGeneralNotes";
import { deleteNoteSetting } from "@/api/slices/settingSlice/settings";

const Setting = () => {
  const { query } = useRouter();
  const { t: translate } = useTranslation();

  const { loading, noteSettings } = useAppSelector((state) => state.settings);

  const tab = query.tab;
  const [switchDetails, setSwitchDetails] = useState<number>(0);

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleChangePassword = () => {
    dispatch(updateModalType({ type: ModalType.PASSWORD_CHANGE }));
  };

  const exclusiveTaxHandler = () => {
    dispatch(updateModalType({ type: ModalType.EXCLUSIVE_TAX }));
  };

  const addTaxHandler = () => {
    dispatch(updateModalType({ type: ModalType.ADD_TAX }));
  };

  const handleEditPayment = () => {
    dispatch(updateModalType({ type: ModalType.EDIT_PAYMENT_METHOD }));
  };

  const handleCreation = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  const handleAddGeneralAddress = () => {
    dispatch(updateModalType({ type: ModalType.ADD_GENERAL_ADDRESS }));
  };

  const handleEditGeneralAddress = () => {
    dispatch(updateModalType({ type: ModalType.EDIT_GENERAL_ADDRESS }));
  };

  const handleAddressGeneralSuccess = () => {
    dispatch(updateModalType({ type: ModalType.GENERAL_SUCCESS_ADDRESS }));
  };

  const handleNoteGeneralSuccess = () => {
    dispatch(updateModalType({ type: ModalType.GENERAL_SUCCESS_NOTES }));
  };

  const handleAddGeneralNote = () => {
    dispatch(updateModalType({ type: ModalType.ADD_GENERAL_NOTE }));
  };

  const handleEditGeneralNote = (id: string) => {
    dispatch(updateModalType({ type: ModalType.EDIT_GENERAL_NOTE, id: id }));
  };

  const handleAddressDelete = async (id: string) => {
    // if (!tax) return;
    // const response = await dispatch(deleteTaxSetting({ data: { id: id } }));
    // if (response?.payload) {
    //   const taxSettings = [...tax];
    //   taxSettings.splice(index, 1);
    //   dispatch(setTaxSettings(taxSettings));
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    // }
  };

  const handleNoteDelete = async (id: string, index: number) => {
    if (!noteSettings) return;
    const response = await dispatch(deleteNoteSetting({ data: { id: id } }));
    if (response?.payload) {
      const taxSettings = [...noteSettings];
      taxSettings.splice(index, 1);
      dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    }
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE]: <ChangePassword onClose={onClose} />,
    [ModalType.ADD_TAX]: (
      <AddTax
        onClose={onClose}
        heading={translate("setting.tax_modal.add_new_tax")}
      />
    ),
    [ModalType.EXCLUSIVE_TAX]: (
      <AddTax
        onClose={onClose}
        heading={translate("setting.tax_modal.exclusive_heading")}
      />
    ),
    [ModalType.ADD_GENERAL_ADDRESS]: (
      <AddGeneralAddress
        onClose={onClose}
        onSuccess={handleAddressGeneralSuccess}
        heading={translate("common.add_address_title")}
      />
    ),
    [ModalType.EDIT_GENERAL_ADDRESS]: (
      <AddGeneralAddress
        onClose={onClose}
        onSuccess={handleAddressGeneralSuccess}
        heading={translate("common.edit_address_title")}
      />
    ),
    [ModalType.GENERAL_SUCCESS_ADDRESS]: (
      <GeneralSuccess
        onClose={onClose}
        heading={translate("common.successful")}
        description={translate("common.address_title_save")}
      />
    ),
    [ModalType.GENERAL_SUCCESS_NOTES]: (
      <GeneralSuccess
        onClose={onClose}
        heading={translate("common.successful")}
        description={translate("common.note_save")}
      />
    ),
    [ModalType.ADD_GENERAL_NOTE]: (
      <GeneralNote
        onClose={onClose}
        onSuccess={handleNoteGeneralSuccess}
        heading={translate("common.add_note")}
      />
    ),
    [ModalType.EDIT_GENERAL_NOTE]: (
      <GeneralNote
        onClose={onClose}
        onSuccess={handleAddressGeneralSuccess}
        heading={translate("common.update_note")}
      />
    ),
    [ModalType.EDIT_PAYMENT_METHOD]: <EditPaymentDetails onClose={onClose} />,
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.admin_setting")}
        modelSubHeading={translate("common.modals.setting_update")}
        routeHandler={onClose}
      />
    ),
  };

  const settingsLookup: { [key: number]: JSX.Element } = {
    0: <SettingProfile handleChangePassword={handleChangePassword} />,
    1: (
      <SystemSettingDetails
        addTaxHandler={addTaxHandler}
        exclusiveTaxHandler={exclusiveTaxHandler}
      />
    ),
    2: <Templates />,
    3: <FollowUpSetting />,
    4: <MailSetting handleCreation={handleCreation} />,
    5: <QRSettings handleCreation={handleCreation} />,
    6: (
      <GeneralSetting
        onAddAddressTitle={handleAddGeneralAddress}
        onEditAddressTitle={handleEditGeneralAddress}
        onAddNote={handleAddGeneralNote}
        onEditNote={handleEditGeneralNote}
        onAddressDelete={handleAddressDelete}
        onNoteDelete={handleNoteDelete}
        noteSettings={noteSettings}
      />
    ),
  };

  useEffect(() => {
    if (tab && !Array.isArray(tab) && !isNaN(Number(tab))) {
      setSwitchDetails(parseInt(tab as string, 10));
    } else {
      setSwitchDetails(0);
    }
  }, [query]);

  return (
    <div className="mb-5">
      <h1 className="text-[#222B45] font-normal text-xl">
        {translate("setting.heading")}
      </h1>
      <div className="mt-[22px]">
        <SettingTopDataButtons
          switchDetails={switchDetails}
          setSwitchDetails={setSwitchDetails}
        />
      </div>

      <div className="mt-4">
        {switchDetails !== undefined && settingsLookup[switchDetails]}
      </div>

      {renderModal()}
    </div>
  );
};

export default Setting;
