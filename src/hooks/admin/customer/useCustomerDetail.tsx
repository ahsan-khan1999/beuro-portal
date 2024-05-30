import {
  readCompanyDetail,
  setCompanyDetails,
  updateCompanyStatus,
} from "@/api/slices/company/companySlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
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

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
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

  useEffect(() => {
    if (id) {
      dispatch(readCompanyDetail({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setCompanyDetails(res.payload));
        }
      );
    }
  }, [id]);

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
  };
}
