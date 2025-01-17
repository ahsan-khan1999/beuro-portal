import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateProfileSettingValidation } from "@/validation/settingSchema";
import { changeProfileSettingFormField } from "@/components/setting/fields/change-profile-setting-fields";
import { useEffect } from "react";
import { isJSON } from "@/utils/functions";
import { getUser } from "@/utils/auth.util";
import { updateAccountSettings } from "@/api/slices/settingSlice/settings";
import { User } from "@/types";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";

export default function useSettingProfile(handleChangePassword: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.settings);
  const { modal } = useAppSelector((state) => state.global);

  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const user: User = isJSON(getUser());

  const schema = generateProfileSettingValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
    resetField,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    reset({
      ...user,
    });
  }, []);

  const handleRestore = () => {
    reset({
      ...user,
    });
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleSuccess = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.admin_setting")}
        modelSubHeading={translate("common.modals.setting_update")}
        routeHandler={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const fields = changeProfileSettingFormField(
    register,
    loading,
    control,
    handleChangePassword,
    user,
    handleRestore
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, ...data?.company };
    const res = await dispatch(
      updateAccountSettings({ data: apiData, router, setError, translate })
    );
    if (res?.payload) handleSuccess();
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    renderModal,
  };
}
