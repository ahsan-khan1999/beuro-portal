import React, { useState } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
import ChangePassword from "@/base-components/ui/modals1/ChangePassword";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { Layout } from "@/layout";
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
import { useRouter } from "next/router";

const Setting = () => {
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
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE));
  };

  const exclusiveTaxHandler = () => {
    dispatch(updateModalType(ModalType.EXCLUSIVE_TAX));
  };

  const addTaxHandler = () => {
    dispatch(updateModalType(ModalType.ADD_TAX));
  };

  const handleEditPayment = () => {
    dispatch(updateModalType(ModalType.EDIT_PAYMENT_METHOD));
  };

  const handleCreation = () => {
    dispatch(updateModalType(ModalType.CREATION));
  };

  const router = useRouter();

  const route = () => {
    router.push("/setting");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE]: <ChangePassword onClose={onClose} />,
    [ModalType.ADD_TAX]: <AddTax onClose={onClose} heading="Add New Tax" />,
    [ModalType.EXCLUSIVE_TAX]: (
      <AddTax onClose={onClose} heading="Exclusive Tax" />
    ),
    [ModalType.EDIT_PAYMENT_METHOD]: <EditPaymentDetails onClose={onClose} />,
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Email Configration Created Successfully"
        subHeading="Thanks for created email configration."
        route={route}
      />
    ),
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
          {switchDetails === 0 ? (
            <SettingProfile handleChangePassword={handleChangePassword} />
          ) : null}
        </div>
        <div className="mt-4">
          {switchDetails === 1 ? (
            <SystemSettingDetails
              addTaxHandler={addTaxHandler}
              exclusiveTaxHandler={exclusiveTaxHandler}
            />
          ) : null}
        </div>
        <div className="mt-4">{switchDetails === 2 ? <Templates /> : null}</div>
        <div className="mt-4">
          {switchDetails === 3 ? <FollowUpSetting /> : null}
        </div>
        <div className="mt-4">
          {switchDetails === 4 ? (
            <Billing handleEditPayment={handleEditPayment} />
          ) : null}
        </div>

        <div className="mt-4">
          {switchDetails === 5 ? <MailSetting handleCreation={handleCreation}/> : null}
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default Setting;
