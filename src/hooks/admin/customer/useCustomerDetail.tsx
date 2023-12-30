import { readCompanyDetail, setCompanyDetails, updateCompanyStatus } from "@/api/slices/company/companySlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import WarningModal from "@/base-components/ui/modals1/WarningModal";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CustomerPromiseActionType } from "@/types/customer";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useCustomerDetailAdmin() {
  const [isCustomerFree, setIsCustomerFree] = useState(false);
  const router = useRouter();
  const { companyDetails, loading } = useAppSelector(state => state.company)

  const {
    modal,
  } = useAppSelector((state) => state.global);
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

  const handlePreviousClick = () => {
    router.push("/admin/customers");
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const route = () => {
    //make api call
    onClose();
  };

  const handleAreYouSure = () => {
    !isCustomerFree && dispatch(updateModalType({ type: ModalType.ARE_YOU_SURE_CUSTOMER }));
  };

  const handleCreated = () => {
    onClose();
    setIsCustomerFree(true);
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.ARE_YOU_SURE_CUSTOMER]: (
      <WarningModal handleCreated={handleCreated} onClose={onClose} />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        heading={translate("common.are_you_sure_modal.success")}
        subHeading={translate(
          "admin.customers_details.card_content.customer_free"
        )}
        onClose={onClose}
        route={route}
      />
    ),
  };
  const handleStatusChange = async (value: string) => {
    const res = await dispatch(updateCompanyStatus({ data: { id: companyDetails?.id, status: staticEnums["User"]["accountStatus"][value] } }))
    if (res?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));

  }
  return {
    companyDetails,
    isCustomerFree,
    modal,
    translate,
    handlePreviousClick,
    handleAreYouSure,
    handleCreated,
    onClose,
    route,
    renderModal,
    handleStatusChange,
    loading
  };
}
