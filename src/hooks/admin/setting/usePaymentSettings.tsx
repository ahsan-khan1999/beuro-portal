import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generatePaymentSettingsValidation } from "@/validation/admin/settingSchema";
import { changePaymentSettingsFormField } from "@/components/admin/setting/fields/payment-setting-fields";

export default function usePaymentSettings() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { loading, error } = useAppSelector((state) => state.auth);
  const schema = generatePaymentSettingsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = changePaymentSettingsFormField(register, loading, control);

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
