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

export default function useSettingProfile(handleChangePassword: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const user = isJSON(getUser())
  const schema = generateProfileSettingValidation(translate);
  console.log(user);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useEffect(() => {
    reset({ ...user })
  }, [])

  const fields = changeProfileSettingFormField(register, loading, control, handleChangePassword, user);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // dispatch(resetPassword({ router, data }));
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
