import { Employee } from "@/types/employee";
import { employeesData } from "@/utils/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { servicesDetailsFormField } from "@/components/services/fields/services-fields";
import { employeeDetailsFormField } from "@/components/employees/fields/employee-fields";

const useEmployeeDetail = (stage: boolean) => {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handlePasswordReset = () => {
    dispatch(updateModalType(ModalType.PASSWORD_RESET));
  };

  const passwordResetSuccessfully = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE_SUCCESSFULLY));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_RESET]: (
      <PasswordReset
        onClose={onClose}
        passwordResetSuccessfully={passwordResetSuccessfully}
      />
    ),
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: (
      <PasswordChangeSuccessfully onClose={onClose} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const router = useRouter();
  // @ts-expect-error
  const [employeeDetail, setEmployeeDetail] = useState<Employee>({});
  const { loading } = useAppSelector((state) => state.auth);
  const [isUpdate, setIsUpdate] = useState<boolean>(stage);
  const id = router.query.employee;
  const schema = generateEmployDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (typeof Number(id) == "number") {
      let employee = employeesData.filter((item) => item.id === id)[0];
      if (employee) {
        reset(employee);
      }
      setEmployeeDetail(employee);
    }
  }, [id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const fields = employeeDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, "submit");
  };

  const handlePreviousClick = () => {
    router.push("/services");
  };

  return {
    employeeDetail,
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
  };
};
export default useEmployeeDetail;
