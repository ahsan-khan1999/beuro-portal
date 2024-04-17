import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateEmailTemplateValidation } from "@/validation/settingSchema";
import { EmailTemplateFormField } from "@/components/setting/mail-setting/email-template-fields";
import { updateEmailTemplateSetting } from "@/api/slices/settingSlice/settings";

export const useMailSettingsTemplate = (handleCreation: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, emailSettings } = useAppSelector(
    (state) => state.settings
  );

  const schema = generateEmailTemplateValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    reset({ ...emailSettings });
  }, []);

  const fields = EmailTemplateFormField(
    register,
    loading,
    emailSettings,
    control,
    setValue,
    {
      textColor: emailSettings?.textColour,
      footerColor: emailSettings?.FooterColour,
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await dispatch(
      updateEmailTemplateSetting({ data, router, setError, translate })
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
    translate,
  };
};
