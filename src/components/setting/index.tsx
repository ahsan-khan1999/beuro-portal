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
import AddTax from "@/base-components/ui/modals1/AddTax";
import MailSetting from "./mail-setting";
import Billing from "./billing";
import EditPaymentDetails from "@/base-components/ui/modals1/EditPaymentDetails";
import Templates from "./templates";

const Setting = () => {
  const [switchDetails, setSwitchDetails] = useState(0);
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE]: <ChangePassword onClose={onClose} />,
    [ModalType.ADD_TAX]: <AddTax onClose={onClose} />,
    [ModalType.EDIT_PAYMENT_METHOD]: <EditPaymentDetails onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleChangePassword = () => {
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE));
  };

  const addTaxHandler = () => {
    dispatch(updateModalType(ModalType.ADD_TAX));
  };

  const handleEditPayment = () => {
    dispatch(updateModalType(ModalType.EDIT_PAYMENT_METHOD));
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
            <SystemSettingDetails
              handleChangePassword={handleChangePassword}
              addTaxHandler={addTaxHandler}
            />
          ) : null}
        </div>
        <div className="mt-4">{switchDetails === 2 ? <Templates /> : null}</div>
        <div className="mt-4">
          {switchDetails === 4 ? (
            <Billing handleEditPayment={handleEditPayment} />
          ) : null}
        </div>

        <div className="mt-4">
          {switchDetails === 5 ? <MailSetting /> : null}
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default Setting;
