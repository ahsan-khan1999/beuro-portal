import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CustomersAdmin } from "@/types/admin/customer";
import { customersAdmin } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useCustomerDetail(stage: boolean) {
  const [isCustomerFree, setIsCustomerFree] = useState(false);
  const router = useRouter();
  const [customerDetail, setCustomerDetail] = useState<CustomersAdmin>(
    customersAdmin[0]
  );

  const {
    modal,
  } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

  const id = router.query.customer;

  useEffect(() => {
    if (typeof Number(id) == "number") {
      let customer = customersAdmin.filter((item) => item.id == Number(id))[0];

      setCustomerDetail(customer);
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

  return {
    customerDetail,
    isCustomerFree,
    modal,
    translate,
    handlePreviousClick,
    handleAreYouSure,
    handleCreated,
    onClose,
    route,
  };
}
