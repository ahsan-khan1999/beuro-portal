import {
  readCompanyDetail,
  setCompanyDetails,
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
  const [isCustomerFree, setIsCustomerFree] = useState(false);
  const router = useRouter();
  const { companyDetails, loading } = useAppSelector((state) => state.company);

  const { modal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

  const id = router.query.customer;

  useEffect(() => {
    if (id) {
      dispatch(readCompanyDetail({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setCompanyDetails(res.payload));
        }
      );
    }
  }, [id]);

  const handleBack = () => {
    router.pathname = "/admin/customers";
    delete router.query["customer"];
    updateQuery(router, router.locale as string);
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const route = () => {
    //make api call
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
    // dispatch(deleteCustomer({ customerDetails, router, setError, translate }));
    console.log("delete company");
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
    [ModalType.CREATION]: (
      <CreationCreated
        heading={translate("common.are_you_sure_modal.success")}
        subHeading={translate("common.are_you_sure_modal.success_heading")}
        onClose={onClose}
        route={route}
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
  };
}
