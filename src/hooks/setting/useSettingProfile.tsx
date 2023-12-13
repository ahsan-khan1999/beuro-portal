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

export default function useSettingProfile(handleChangePassword: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.settings);
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


  const fields = changeProfileSettingFormField(register, loading, control, handleChangePassword, user);
  console.log(errors);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, id: user?.id }
    const res = await dispatch(updateAccountSettings({ data: apiData, router, setError, translate }))
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
