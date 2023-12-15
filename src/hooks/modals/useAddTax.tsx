import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { addTaxFormField } from "@/components/setting/fields/add-tax-fields";
import { generateAddTaxValidationSchema } from "@/validation/modalsSchema";
import { createTaxSetting } from "@/api/slices/settingSlice/settings";

export default function useAddTax(onClose: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.settings);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const schema = generateAddTaxValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = addTaxFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await dispatch(createTaxSetting({ data: { ...data, taxType: 1 }, router, setError, translate }));
    if (response?.payload) onClose()

  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
