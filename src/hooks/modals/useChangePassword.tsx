import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordFormField } from "@/components/setting/fields/change-password-fields";
import { generatePasswordChangeValidationSchema } from "@/validation/modalsSchema";
import { updateUserPassword } from "@/api/slices/settingSlice/settings";
import { isJSON } from "@/utils/functions";
import { getUser } from "@/utils/auth.util";
import { User } from "@/types";

export default function useChangePassword(onClose: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.settings);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const schema = generatePasswordChangeValidationSchema(translate);
  const user: User = isJSON(getUser())

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = ChangePasswordFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await dispatch(updateUserPassword({ data: { ...data, id: user?.id }, router, setError, translate }));
    if (response?.payload) onClose();
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    translate
  };
}
