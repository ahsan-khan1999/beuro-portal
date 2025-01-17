import { servicesDetailsFormField } from "@/components/services/fields/services-fields";
import { DEFAULT_SERVICE } from "@/utils/static";
import { generateServicesValidation } from "@/validation/servicesSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  createService,
  deleteService,
  readServiceDetail,
  setServiceDetails,
  updateService,
} from "@/api/slices/service/serviceSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateQuery } from "@/utils/update-query";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { CustomerPromiseActionType } from "@/types/customer";
import RecordUpdateSuccess from "@/base-components/ui/modals1/RecordUpdateSuccess";

const useServiceDetail = (stage: boolean) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { serviceDetails, loading } = useAppSelector((state) => state.service);
  const {
    modal: { data },
  } = useAppSelector((state) => state.global);

  const { modal } = useAppSelector((state) => state.global);
  const [isUpdate, setIsUpdate] = useState<boolean>(stage);
  const id = router.query.service;

  const onClose = () => {
    dispatch(
      updateModalType({
        type: ModalType.NONE,
      })
    );
  };

  const handleUpdateConfirm = (data: any) => {
    dispatch(updateService({ data, router, setError, translate }));
  };

  const handleCreateSuccess = () => {
    dispatch(
      updateModalType({
        type: ModalType.CREATE_SUCCESS,
      })
    );
  };
  const handleUpdate = (data: any) => {
    dispatch(
      updateModalType({
        type: ModalType.UPDATE_SUCCESS,
        data: data,
      })
    );
  };

  const deleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: serviceDetails?.refID, id: serviceDetails?.id },
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
    dispatch(deleteService({ serviceDetails, router, setError, translate }));
  };

  const changeRouterHandler = () => {
    router.pathname = "/services";
    updateQuery(router, router.locale as string);
    onClose();
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.service_confirm")}
        subHeading={translate("common.modals.service_ID")}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_service")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.created_service")}
        modelSubHeading={translate("common.modals.service_created_des")}
        routeHandler={changeRouterHandler}
      />
    ),
    [ModalType.UPDATE_SUCCESS]: (
      <RecordUpdateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.are_sure")}
        modelSubHeading={translate("common.modals.delete_record")}
        cancelHandler={onClose}
        confirmHandler={() =>
          confrimUpdate({ data, router, setError, translate })
        }
        loading={loading}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const schema = generateServicesValidation(translate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (id) {
      dispatch(readServiceDetail({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setServiceDetails(res.payload));
          if (serviceDetails && stage) reset({ ...res.payload });
        }
      );
    }
  }, [id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const fields = servicesDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel
  );

  const confrimUpdate = async ({
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
      updateService({ data, router, setError, translate })
    );
    if (res?.payload) {
      dispatch(setServiceDetails(DEFAULT_SERVICE));
      onClose();
      (router.pathname = "/services"), (router.query = { page: "1" });
      updateQuery(router, router.locale as string);
    } else {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let res;
    if (!stage) {
      res = await dispatch(
        createService({ data, router, setError, translate })
      );

      if (res?.payload) handleCreateSuccess();
    } else if (stage) {
      handleUpdate({ ...data });
    }
  };

  return {
    serviceDetails,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handleUpdateCancel,
    renderModal,
    deleteHandler,
    loading,
    translate,
  };
};

export default useServiceDetail;
