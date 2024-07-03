import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateChangeMailSettingValidationSchema } from "@/validation/settingSchema";
import { ChangeMailSettingFormField } from "@/components/setting/mail-setting/change-mail-setting-fields";
import { useEffect } from "react";
import { updateEmailSetting } from "@/api/slices/settingSlice/settings";

export const useChangeMailSetting = (
  handleCreation: Function,
  selectedTab: number
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, emailSettings } = useAppSelector(
    (state) => state.settings
  );

  const schema = generateChangeMailSettingValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    reset({ ...emailSettings });
  }, []);

  const fields = ChangeMailSettingFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await dispatch(
      updateEmailSetting({
        data: { ...data, isOwnMailConfigration: Boolean(selectedTab) },
        router,
        setError,
        translate,
      })
    );
    if (response?.payload) handleCreation();
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
