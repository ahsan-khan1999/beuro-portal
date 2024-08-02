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
import { updateQuery } from "@/utils/update-query";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { useAppSelector } from "@/hooks/useRedux";
import { User } from "@/types";
import { isJSON } from "@/utils/functions";
import { getUser } from "@/utils/auth.util";
import { AgentPrfoileSettingFormField } from "@/components/agent/setting/setting-profile-fields";
import { staticEnums } from "@/utils/static";

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
      ...user,
      designation: staticEnums["Designation"][user?.employee],
    });
  }, []);

  const handleUpdateSuccess = () => {
    router.pathname = "/employees";
    delete router.query["employee"];
    updateQuery(router, router.locale as string);
    onClose();
  };

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

  const fields = AgentPrfoileSettingFormField(register, loading, control);

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
