import { useTranslation } from "next-i18next";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateCustomerValidation } from "@/validation/customersSchema";
import {
  FieldValues,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerDetailsFormField } from "@/components/customer/customer-fields";
import {
  createCustomer,
  deleteCustomer,
  readCustomerDetail,
  setCustomerDetails,
  updateCustomer,
} from "@/api/slices/customer/customerSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { DEFAULT_CUSTOMER, staticEnums } from "@/utils/static";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import RecordUpdateSuccess from "@/base-components/ui/modals1/RecordUpdateSuccess";
import { updateQuery } from "@/utils/update-query";

export default function useCustomerDetail({
  detail,
  idAddNewCustomer,
}: {
  detail: boolean;
  idAddNewCustomer: boolean;
}) {
  const [isUpdate, setIsUpdate] = useState<boolean>(detail);
  const { modal } = useAppSelector((state) => state.global);
  const { loading, customerDetails, isLoading } = useAppSelector(
    (state) => state.customer
  );
  const {
    modal: { data },
  } = useAppSelector((state) => state.global);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

  const onClose = () => {
    dispatch(
      updateModalType({
        type: ModalType.NONE,
      })
    );
  };

  const handleCreateSuccess = () => {
    dispatch(
      updateModalType({
        type: ModalType.CREATE_SUCCESS,
      })
    );
  };

  const handleUpdateCancle = () => {
    dispatch(
      updateModalType({
        type: ModalType.NONE,
      })
    );
  };

  const handleUpdate = (data: any) => {
    dispatch(
      updateModalType({
        type: ModalType.UPDATE_SUCCESS,
        data: JSON.parse(JSON.stringify(data)),
      })
    );
  };

  const deleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: customerDetails?.refID, id: customerDetails?.id },
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

  const routeHandler = async () => {
    const res = await dispatch(
      deleteCustomer({ customerDetails, router, setError, translate })
    );
    if (!res?.payload) {
      dispatch(
        updateModalType({
          type: ModalType.NONE,
        })
      );
    }
  };

  const changeRouterHandler = () => {
    router.pathname = "/customers";
    updateQuery(router, router.locale as string);
    onClose();
  };

  const id = router.query.customer;
  const schema = generateCustomerValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const customerType = watch("customerType");

  useEffect(() => {
    if (id) {
      dispatch(readCustomerDetail({ params: { filter: id } }));
    }
    return () => {
      dispatch(readCustomerDetail({ ...DEFAULT_CUSTOMER }));
    };
  }, [id]);

  useMemo(() => {
    if (customerDetails && detail)
      reset({
        ...customerDetails,
        gender: staticEnums["Gender"][customerDetails?.gender],
      });
  }, [customerDetails.id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const fields = customerDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel,
    { customer: customerDetails, customerType: customerType },
    control,
    idAddNewCustomer,
    setValue
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let res;
    if (!detail) {
      res = await dispatch(
        createCustomer({ data, router, setError, translate })
      );
      if (res.payload) handleCreateSuccess();
    } else if (detail) {
      handleUpdate(data);
    }
  };

  const test = async ({
    data,
    router,
    setError,
    translate,
  }: {
    data: any;
    router: NextRouter;
    setError: UseFormSetError<FieldValues>;
    translate: Function;
  }) => {
    let res = await dispatch(
      updateCustomer({ data, router, setError, translate })
    );

    if (res.payload) {
      dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
      onClose();
      router.pathname = "/customers";
      updateQuery(router, router.locale as string);
    } else {
      onClose();
    }
  };

  const handlePreviousClick = () => {
    router.push("/customers");
  };

  const MODAL_CONFIG: ModalConfigType = {
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
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.created_customer")}
        modelSubHeading={translate("common.modals.customer_created_des")}
        routeHandler={changeRouterHandler}
      />
    ),
    [ModalType.UPDATE_SUCCESS]: (
      <RecordUpdateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.are_sure")}
        modelSubHeading={translate("common.modals.leave_page")}
        cancelHandler={handleUpdateCancle}
        confirmHandler={() => test({ data, router, setError, translate })}
        loading={loading}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    customerDetail: customerDetails,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handlePreviousClick,
    handleUpdateCancel,
    deleteHandler,
    renderModal,
    handleCreateSuccess,
    loading,
    isLoading,
    translate,
  };
}
