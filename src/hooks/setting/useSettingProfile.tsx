import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
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
  const user: User = isJSON(getUser())
  const schema = generateProfileSettingValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useEffect(() => {
    reset({
      ...user,
      companyName: user.company?.companyName,
      website: user.company?.website,
      taxNumber: user.company?.taxNumber,
      address: user.company?.address,
      bankDetails: user.company?.bankDetails,
    })
  }, [])
  
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }))
  }
  const handleSuccess = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }))
  }

  const MODAL_CONFIG: ModalConfigType = {

    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading="Settings Updated Successful "
        modelSubHeading="Thanks! we are happy to have you. "
        routeHandler={onClose}
      />
    ),

  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const fields = changeProfileSettingFormField(register, loading, control, handleChangePassword, user);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data }
    delete apiData["id"]
    const res = await dispatch(updateAccountSettings({ data: apiData, router, setError, translate }))
    if (res?.payload) handleSuccess()
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    renderModal
  };
}
