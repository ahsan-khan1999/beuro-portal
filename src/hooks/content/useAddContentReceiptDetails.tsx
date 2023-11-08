import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddReceiptContentDetailsFormField } from "@/components/content/add/fields/add-receipt-details-fields";
import { generateEditReceiptContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";

export const useAddContentReceiptDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleBack = () => {
    onHandleNext(ComponentsType.addInvoiceContent);
  };

  const schema = generateEditReceiptContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddReceiptContentDetailsFormField(register, loading, control, handleBack);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onHandleNext(ComponentsType.addReceiptContent);
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
