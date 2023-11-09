import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { addTaxFormField } from "@/components/setting/fields/add-tax-fields";
import { generateAddTaxValidationSchema } from "@/validation/modalsSchema";

export default function useAddTax(onClose: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const schema = generateAddTaxValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = addTaxFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(resetPassword({ router, data }));
    onClose();
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
