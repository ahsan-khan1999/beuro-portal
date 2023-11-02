import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import FormData from "./FormData";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import PasswordReset from "@/base-components/ui/modals1/PasswordReset";
import PasswordChangeSuccessfully from "@/base-components/ui/modals1/PasswordChangeSuccessfully";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";

const EmploysDetails = () => {
  const { employeeDetail } = useEmployeeDetail();
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handlePasswordReset = () => {
    dispatch(updateModalType(ModalType.PASSWORD_RESET));
  };

  const passwordResetSuccessfully = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE_SUCCESSFULLY));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_RESET]: (
      <PasswordReset
        onClose={onClose}
        passwordResetSuccessfully={passwordResetSuccessfully}
      />
    ),
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: (
      <PasswordChangeSuccessfully onClose={onClose} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            date={employeeDetail?.createdOn}
            id={employeeDetail?.id}
            name={employeeDetail?.name}
          />
        </DetailsCard>
        <div className="flex mt-8">
          <FormData
            handlePasswordReset={handlePasswordReset}
            employeeDetail={employeeDetail}
          />
          <SideCard />
        </div>
      </Layout>

      {renderModal()}
    </>
  );
};

export default EmploysDetails;
