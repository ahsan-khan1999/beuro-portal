import React, { useState } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
import ChangePassword from "@/base-components/ui/modals1/ChangePassword";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import SettingTopDataButtons from "./SettingTopDataButtons";
import SystemSettingDetails from "./system-setting/SystemSettingDetails";
import AddTax from "@/base-components/ui/modals1/AddTax";
import MailSetting from "./mail-setting";
import Billing from "./billing";
import EditPaymentDetails from "@/base-components/ui/modals1/EditPaymentDetails";
import Templates from "./templates";
import FollowUpSetting from "./follow-up-setting";
import SettingProfile from "./profile-form";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useTranslation } from "next-i18next";
import QRSettings from "./qr-settings";

const Setting = () => {
  const { t: translate } = useTranslation();
  const [switchDetails, setSwitchDetails] = useState(0);
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
    dispatch(updateModalType({ type: ModalType.CREATION }));
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
    [ModalType.EDIT_PAYMENT_METHOD]: <EditPaymentDetails onClose={onClose} />,
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Email Configration Created Successfully"
        subHeading="Thanks for created email configration."
        route={onClose}
      />
    ),
  };
  const settingsLookup = {
    0: <SettingProfile handleChangePassword={handleChangePassword} />,
    1: (
      <SystemSettingDetails
        addTaxHandler={addTaxHandler}
        exclusiveTaxHandler={exclusiveTaxHandler}
      />
    ),
    2: <Templates />,
    3: <FollowUpSetting />,

    4: <Billing handleEditPayment={handleEditPayment} />,
    5: <MailSetting handleCreation={handleCreation} />,
    6: <QRSettings handleCreation={handleCreation} />
  };
  return (
    <>
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
        {settingsLookup[switchDetails as keyof typeof settingsLookup]}
      </div>

      {renderModal()}
    </>
  );
};

export default Setting;
