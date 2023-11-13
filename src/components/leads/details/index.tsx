import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import LeadsDetailsCardData from "../LeadsDetailsCardData";
import LeadsDetailsData from "./LeadsDetailsData";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { useRouter } from "next/router";

const LeadsDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const router = useRouter();

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const leadDeleteHandler = () => {
    console.log("clickde");
    dispatch(updateModalType(ModalType.CONFIRM_DELETION));
  };

  const handleDelete = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.INFO_DELETED));
  };

  const routeHandler = () => {
    dispatch(updateModalType(ModalType.NONE));
    router.push("/leads");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading="Please confirm Lead ID"
        subHeading="Enter Lead ID"
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading="Are you sure you want to delete this Lead?"
        routeHandler={routeHandler}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <DetailsCard>
          <LeadsDetailsCardData leadDeleteHandler={leadDeleteHandler} />
        </DetailsCard>
        <div className=" mt-7">
          <LeadsDetailsData />
        </div>
      </Layout>

      {renderModal()}
    </>
  );
};

export default LeadsDetails;
