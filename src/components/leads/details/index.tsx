import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React, { useEffect } from "react";
import LeadsDetailsCardData from "../LeadsDetailsCardData";
import LeadsDetailsData from "./LeadsDetailsData";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";

const LeadsDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: <DeleteConfirmation_2 />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE_SUCCESSFULLY));
  }, []);
  
  return (
    <>
      <Layout>
        <DetailsCard>
          <LeadsDetailsCardData />
        </DetailsCard>
        <div className="flex mt-7">
          <LeadsDetailsData />
        </div>
      </Layout>

      {renderModal()}
    </>
  );
};

export default LeadsDetails;
