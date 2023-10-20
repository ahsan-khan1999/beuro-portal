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

const EmploysDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // function for hnadling the add note
  const handlePasswordReset = () => {
    dispatch(updateModalType(ModalType.PASSWORD_RESET));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_RESET]: <PasswordReset onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData />
        </DetailsCard>
        <div className="flex mt-8">
          <FormData handlePasswordReset={handlePasswordReset} />
          <SideCard />
        </div>
      </Layout>

      {renderModal()}
    </>
  );
};

export default EmploysDetails;
