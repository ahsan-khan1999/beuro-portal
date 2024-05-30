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
import { useEffect } from "react";
import { deleteEmail, readEmailDetail } from "@/api/slices/emailTracker/email";
import { CustomerPromiseActionType } from "@/types/customer";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
const ViewMails = () => {
  const { modal } = useAppSelector((state) => state.global);
  const { emailDetails, loading } = useAppSelector((state) => state.emailSlice);
  const router = useRouter();

  const id = router.query.email;

  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  useEffect(() => {
    if (id) {
      dispatch(readEmailDetail({ params: { filter: id } }));
    }
  }, [id]);

  const handleConfirmDeletion = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: emailDetails?.id && emailDetails.id.slice(-5) },
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.DELETE_MAIL }));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const routeHandler = async () => {
    const res = await dispatch(
      deleteEmail({ data: emailDetails, router, translate })
    );
    if (res?.payload) router.push("/email-tracker");
  };
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        handleDelete={handleDelete}
        onClose={onClose}
        modelHeading={translate(
          "email_tracker.email_confirmation_modal.main_heading"
        )}
        subHeading={translate(
          "email_tracker.email_confirmation_modal.sub_heading"
        )}
      />
    ),
    [ModalType.DELETE_MAIL]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("email_tracker.email_delete_modal.heading")}
        routeHandler={routeHandler}
        loading={loading}
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
          <DetailsData
            handleConfirmDeletion={handleConfirmDeletion}
            emailDetails={emailDetails}
          />
        </DetailsCard>
        <div className="mt-7">
          {loading ? (
            <div className="flex justify-center items-center">
              <CustomLoader />
            </div>
          ) : (
            <EmailDetailsData emailDetails={emailDetails} />
          )}
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default ViewMails;
