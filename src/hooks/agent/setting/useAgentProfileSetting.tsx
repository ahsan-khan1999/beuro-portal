import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import PasswordReset from "@/base-components/ui/modals1/PasswordReset";
import PasswordChangeSuccessfully from "@/base-components/ui/modals1/PasswordChangeSuccessfully";
import { generateEmployDetailsValidation } from "@/validation/employeeSchema";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateEmployee } from "@/api/slices/employee/emplyeeSlice";
import { User } from "@/types";
import { isJSON } from "@/utils/functions";
import { useAppSelector } from "@/hooks/useRedux";
import { getUser } from "@/utils/auth.util";
import { AgentPrfoileSettingFormField } from "@/components/agent/setting/setting-profile-fields";

export const useAgentProfileSetting = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user: User = isJSON(getUser());
  const { t: translate } = useTranslation();
  const { modal, loading } = useAppSelector((state) => state.global);

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

  const handleCancel = () => {
    router.push({
      pathname: "/agent/dashboard",
    });
  };

  const schema = generateEmployDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    control,
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    reset({
      ...user.employee,
    });
  }, []);

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

  const fields = AgentPrfoileSettingFormField(
    register,
    loading,
    control,
    handleCancel,
    handlePasswordReset
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await dispatch(
        updateEmployee({ data, router, setError, translate })
      );
      if (res?.payload)
        dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  return {
    handlePasswordReset,
    renderModal,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    translate,
  };
};
