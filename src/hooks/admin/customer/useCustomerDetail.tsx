import {
  readCompanyDetail,
  setCompanyDetails,
  updateAdminCompany,
  updateCompanyStatus,
} from "@/api/slices/company/companySlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { AreYouSureMakeAccountFree } from "@/base-components/ui/modals1/SueAccountFree";
import WarningModal from "@/base-components/ui/modals1/WarningModal";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CustomerPromiseActionType } from "@/types/customer";
import { staticEnums } from "@/utils/static";
import { updateQuery } from "@/utils/update-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useCustomerDetailAdmin() {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const [isCustomerFree, setIsCustomerFree] = useState(false);
  const { companyDetails, loading } = useAppSelector((state) => state.company);
  const [isToggleChecked, setIsToggleChecked] = useState(
    companyDetails?.company?.isAppointment || false
  );

  const [subHeading, setSubHeading] = useState(
    translate("common.are_you_sure_modal.appointment_heading")
  );

  const id = router.query.customer;
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);

  useEffect(() => {
    if (id) {
      dispatch(readCompanyDetail({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setCompanyDetails(res?.payload));

          const isAppointment = res.payload?.company?.isAppointment || false;
          setIsToggleChecked(isAppointment);
          setSubHeading(
            isAppointment
              ? translate("common.are_you_sure_modal.remove_appointments")
              : translate("common.are_you_sure_modal.appointment_heading")
          );
        }
      );
    }
  }, [id]);

  useEffect(() => {
    if (companyDetails?.company?.isAppointment !== undefined) {
      setIsToggleChecked(companyDetails?.company?.isAppointment);
    }
  }, [companyDetails?.company?.isAppointment]);

  const handleBack = () => {
    router.pathname = "/admin/customers";
    delete router.query["customer"];
    updateQuery(router, router.locale as string);
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const route = () => {
    onClose();
  };

  const handleAreYouSure = () => {
    dispatch(updateModalType({ type: ModalType.ARE_YOU_SURE_CUSTOMER }));
  };

  const handleCreated = () => {
    onClose();
    setIsCustomerFree(true);
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleDefaultModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleMakeAccountFree = () => {
    !isCustomerFree &&
      dispatch(updateModalType({ type: ModalType.ARE_YOU_COMPANY }));
  };

  const deleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: companyDetails?.refID, id: companyDetails?.id },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      updateModalType({
        type: ModalType.INFO_DELETED,
      })
    );
  };

  const routeHandler = () => {
    console.log("delete company");
  };

  const handleCompanyUpdate = async (isAppointment?: boolean) => {
    if (!companyDetails?.id) return;

    const response = await dispatch(
      updateAdminCompany({
        data: { id: companyDetails?.company?.id, isAppointment },
      })
    );

    if (response?.payload) {
      isAppointment && setIsToggleChecked(isAppointment);

      setSubHeading(
        isAppointment
          ? translate("common.are_you_sure_modal.remove_appointments")
          : translate("common.are_you_sure_modal.appointment_heading")
      );

      dispatch(
        readCompanyDetail({ params: { filter: companyDetails?.id } })
      ).then((res: CustomerPromiseActionType) => {
        dispatch(setCompanyDetails(res.payload));
      });
      dispatch(updateModalType({ type: ModalType.CREATION }));
    } else {
      setIsToggleChecked(!isAppointment);
      setSubHeading(
        !isAppointment
          ? translate("common.are_you_sure_modal.remove_appointments")
          : translate("common.are_you_sure_modal.appointment_heading")
      );
    }
  };

  const handleAddAppointment = (
    isAppointment?: boolean,
    companyName?: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.ARE_ADD_APPOINTMENTS,
        data: {
          isAppointment,
          companyName,
        },
      })
    );
  };

  const handleStatusChange = async (custmerStatus: string) => {
    const res = await dispatch(
      updateCompanyStatus({
        data: {
          id: companyDetails?.id,
          status: staticEnums["User"]["accountStatus"][custmerStatus],
        },
      })
    );
    if (res?.payload) handleDefaultModal();
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.ARE_YOU_SURE_CUSTOMER]: (
      <WarningModal handleCreated={handleCreated} onClose={onClose} />
    ),
    [ModalType.ARE_YOU_COMPANY]: (
      <AreYouSureMakeAccountFree
        onClose={onClose}
        onSuccess={handleAreYouSure}
        heading={translate("common.are_you_sure_modal.title")}
        sub_heading={translate("common.are_you_sure_modal.sub_heading")}
      />
    ),
    [ModalType.ARE_ADD_APPOINTMENTS]: (
      <AreYouSureMakeAccountFree
        onClose={onClose}
        onSuccess={handleCompanyUpdate}
        heading={translate("common.are_you_sure_modal.title")}
        sub_heading={subHeading}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.record_update_des")}
        onClose={onClose}
        route={onClose}
      />
    ),
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.customer_confirm")}
        subHeading={translate("common.modals.customer_ID")}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_customer")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    companyDetails,
    isCustomerFree,
    modal,
    translate,
    handleBack,
    handleAreYouSure,
    handleCreated,
    onClose,
    route,
    renderModal,
    handleStatusChange,
    loading,
    handleMakeAccountFree,
    deleteHandler,
    handleCompanyUpdate,
    handleAddAppointment,
    isToggleChecked,
  };
}
