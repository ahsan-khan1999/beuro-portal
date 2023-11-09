import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddContentInvoiceDetailsFormField } from "@/components/content/add/fields/add-invoice-details-fields";
import { generateEditInvoiceContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";

export const useAddContentInvoiceDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const backHandle = () => {
    onHandleNext(ComponentsType.addConfirmationContent);
  };

  const schema = generateEditInvoiceContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddContentInvoiceDetailsFormField(
    register,
    loading,
    control,
    backHandle
  );
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
