import { Employee } from "@/types/employee";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import PasswordReset from "@/base-components/ui/modals1/PasswordReset";
import PasswordChangeSuccessfully from "@/base-components/ui/modals1/PasswordChangeSuccessfully";
import { generateEmployDetailsValidation } from "@/validation/employeeSchema";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeDetailsFormField } from "@/components/employees/fields/employee-fields";
import {
  createEmployee,
  deleteEmployee,
  readEmployeeDetail,
  setEmployeeDetails,
  updateEmployee,
} from "@/api/slices/employee/emplyeeSlice";
import { updateQuery } from "@/utils/update-query";
import { CustomerPromiseActionType } from "@/types/customer";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";

const useEmployeeDetail = (stage: boolean) => {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { modal } = useAppSelector((state) => state.global);
  const { employeeDetails } = useAppSelector((state) => state.employee);

  const router = useRouter();

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handlePasswordReset = () => {
    dispatch(updateModalType({ type: ModalType.PASSWORD_RESET }));
  };

  const passwordResetSuccessfully = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
    dispatch(updateModalType({ type: ModalType.PASSWORD_CHANGE_SUCCESSFULLY }));
  };
  // METHOD FOR HANDLING THE MODALS

  const { loading } = useAppSelector((state) => state.employee);
  const [isUpdate, setIsUpdate] = useState<boolean>(stage);
  const id = router.query.employee;
  const schema = generateEmployDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    control,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (id) {
      dispatch(readEmployeeDetail({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setEmployeeDetails(res.payload));
        }
      );
    }
  }, [id]);
  useMemo(() => {
    if (employeeDetails && stage) reset({ ...employeeDetails });
  }, [employeeDetails?.id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };
  const handleUpdateSuccess = () => {
    router.pathname = "/employees";
    router.query = { page: "1" };
    updateQuery(router, router.locale as string);
    onClose();
  };
  const handleCreateSuccess = (email: string) => {
    dispatch(
      updateModalType({ type: ModalType.EMPLOYEE_SUCCESS, data: email })
    );
  };
  const deleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: employeeDetails?.employeeID, id: employeeDetails?.id },
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
      deleteEmployee({ data: employeeDetails, router, setError, translate })
    );
    if (res?.payload) {
      onClose();
      router.pathname = "/employees";
      updateQuery(router, router.locale as string);
    }
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.employee_confirm")}
        subHeading={translate("common.modals.employee_ID")}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_employee")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
    [ModalType.PASSWORD_RESET]: (
      <PasswordReset
        onClose={onClose}
        passwordResetSuccessfully={passwordResetSuccessfully}
      />
    ),
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: (
      <PasswordChangeSuccessfully onClose={onClose} />
    ),
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.offer_created")}
        modelSubHeading={translate("common.modals.update_success")}
        routeHandler={handleUpdateSuccess}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const fields = employeeDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel,
    employeeDetails,
    control
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let res;
    if (!stage) {
      res = await dispatch(
        createEmployee({ data, router, setError, translate })
      );
      if (res.payload) handleCreateSuccess(data?.email);
    } else if (stage) {
      res = await dispatch(
        updateEmployee({ data, router, setError, translate })
      );
      if (res.payload)
        dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    }
  };

  const handlePreviousClick = () => {
    router.push("/employees");
  };

  return {
    employeeDetails,
    handlePasswordReset,
    renderModal,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handlePreviousClick,
    handleUpdateCancel,
    deleteHandler,
    translate,
    loading,
  };
};
export default useEmployeeDetail;
