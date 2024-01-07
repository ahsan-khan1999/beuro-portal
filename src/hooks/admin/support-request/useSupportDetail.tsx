import { readContactSupportDetail, setSupportReqDetails, updateContactSupport } from "@/api/slices/contactSupport/contactSupportSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { DropDownItem } from "@/types";
import { CustomerPromiseActionType } from "@/types/customer";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useSupportDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { contactSupportDetails, loading } = useAppSelector(state => state.contactSupport)
  const {
    modal,
  } = useAppSelector((state) => state.global);
  const { t: translate } = useTranslation();

  const items: DropDownItem[] = [
    {
      item: "pending",
    },
    {
      item: "resolved",
    },
    
  ];
  const id = router.query.supportRequest;

  useEffect(() => {
    if (id) {
      dispatch(readContactSupportDetail({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setSupportReqDetails(res.payload));
        }
      );
    }
  }, [id]);

  const handlePreviousClick = () => {
    router.push("/admin/support-request");
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const MODAL_CONFIG: ModalConfigType = {

    [ModalType.CREATION]: (
      <CreationCreated
        heading={translate("common.are_you_sure_modal.success")}
        subHeading={translate(
          "admin.customers_details.card_content.customer_free"
        )}
        onClose={onClose}
        route={onClose}
      />
    ),
  };
  const handleStatusUpadte = async (value: string) => {
    const response = await dispatch(updateContactSupport({ data: { id: contactSupportDetails?.id, status: staticEnums["SupportRequest"][value] }, router, translate }))
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));


  }
  return {
    contactSupportDetails,
    status: items,
    handlePreviousClick,
    handleStatusUpadte,
    renderModal,
    loading
  };
}