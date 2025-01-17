import React, { useEffect, useState } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
import ChangePassword from "@/base-components/ui/modals1/ChangePassword";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import SettingTopDataButtons from "./SettingTopDataButtons";
import SystemSettingDetails from "./system-setting/SystemSettingDetails";
import AddTax from "@/base-components/ui/modals1/AddTax";
import EditPaymentDetails from "@/base-components/ui/modals1/EditPaymentDetails";
import Templates from "./templates";
import FollowUpSetting from "./follow-up-setting";
import SettingProfile from "./profile-form";
import QRSettings from "./qr-settings";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { useRouter } from "next/router";
import { GeneralSetting } from "./general-setting";
import { AddGeneralAddress } from "@/base-components/ui/modals1/GeneralAddressTitle";
import { GeneralSuccess } from "@/base-components/ui/modals1/GeneralSuccess";
import { GeneralNote } from "@/base-components/ui/modals1/AddGeneralNotes";
import {
  deleteNoteSetting,
  readNoteSettings,
} from "@/api/slices/settingSlice/settings";
import { useTranslation } from "next-i18next";
import { MailSetting } from "./mail-setting";

const Setting = () => {
  const { query } = useRouter();
  const { t: translate } = useTranslation();

  const { noteSettings } = useAppSelector((state) => state.settings);

  const dispatch = useDispatch();
  const tab = query.tab;
  const [switchDetails, setSwitchDetails] = useState<number>(0);

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

  // const handleEditPayment = () => {
  //   dispatch(updateModalType({ type: ModalType.EDIT_PAYMENT_METHOD }));
  // };

  const handleCreation = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  // const handleAddressGeneralSuccess = () => {
  //   dispatch(updateModalType({ type: ModalType.GENERAL_SUCCESS_ADDRESS }));
  // };

  const handleNoteGeneralSuccess = () => {
    dispatch(updateModalType({ type: ModalType.GENERAL_SUCCESS_NOTES }));
  };

  const handleAddGeneralAddress = () => {
    dispatch(updateModalType({ type: ModalType.ADD_GENERAL_ADDRESS }));
  };

  const handleEditGeneralAddress = (id: number) => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_GENERAL_ADDRESS,
        data: {
          id: id,
        },
      })
    );
  };

  const handleAddGeneralNote = () => {
    dispatch(updateModalType({ type: ModalType.ADD_GENERAL_NOTE }));
  };

  const handleEditGeneralNote = (
    id: string,
    note: { noteType: string; description: string }
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_GENERAL_NOTE,
        data: {
          id: id,
          data: {
            noteType: note.noteType,
            description: note.description,
          },
        },
      })
    );
  };

  const handleNoteDelete = async (id: string, index: number) => {
    if (!noteSettings) return;
    const response = await dispatch(deleteNoteSetting({ data: { id: id } }));
    if (response?.payload) {
      const noteSetting = [...noteSettings];
      noteSetting.splice(index, 1);
      dispatch(readNoteSettings());
      handleCreation();
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
        heading={translate("common.add_address_title")}
      />
    ),
    [ModalType.EDIT_GENERAL_ADDRESS]: (
      <AddGeneralAddress
        onClose={onClose}
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
        onSuccess={handleCreation}
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
        onNoteDelete={handleNoteDelete}
        noteSettings={noteSettings}
        onSuccess={handleCreation}
        onClose={onClose}
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
      <h1 className="text-[#222B45] font-normal text-2xl">
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
