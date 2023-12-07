import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import EmailDetailsData from "./EmailDetailsData";
import DetailsData from "../DetailsData";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const ViewMails = () => {
  const { modal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

  const handleConfirmDeletion = () => {
    dispatch(updateModalType(ModalType.CONFIRM_DELETION));
  };

  const handleDelete = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.DELETE_MAIL));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const router = useRouter();
  const routeHandler = () => {
    router.push("/email-tracker");
  };
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        handleDelete={handleDelete}
        onClose={onClose}
        modelHeading={translate("email_tracker.email_confirmation_modal.main_heading")}
        subHeading={translate("email_tracker.email_confirmation_modal.sub_heading")}
      />
    ),
    [ModalType.DELETE_MAIL]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("email_tracker.email_delete_modal.heading")}
        routeHandler={routeHandler}
        loading={false}
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
          <DetailsData handleConfirmDeletion={handleConfirmDeletion} />
        </DetailsCard>
        <div className="flex mt-7">
          <EmailDetailsData />
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default ViewMails;
