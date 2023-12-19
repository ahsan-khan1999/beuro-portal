import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateEmailTemplateValidation } from "@/validation/settingSchema";
import { EmailTemplateFormField } from "@/components/setting/mail-setting/email-template-fields";
import {
  readEmailSettings,
  updateEmailSetting,
} from "@/api/slices/settingSlice/settings";

export const useMailSettingsTemplate = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.settings);

  const schema = generateEmailTemplateValidation(translate);
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
    dispatch(readEmailSettings({})).then((response: any) => {
      reset({ ...response?.payload });
    });
  }, []);

  const fields = EmailTemplateFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data");
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
