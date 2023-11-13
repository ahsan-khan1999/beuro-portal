import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateProfileSettingValidation } from "@/validation/settingSchema";
import { changeProfileSettingFormField } from "@/components/setting/fields/change-profile-setting-fields";

export default function useSettingProfile(handleChangePassword:Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const schema = generateProfileSettingValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = changeProfileSettingFormField(register, loading, control, handleChangePassword);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(resetPassword({ router, data }));
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
