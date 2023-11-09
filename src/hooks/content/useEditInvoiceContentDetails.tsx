import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EditInvoiceContentDetailsFormField } from "@/components/content/edit/fields/edit-invoice-details-fields";
import { generateEditInvoiceContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";

export const useEditInvoiceContentDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const handleBack = () => {
    onClick(2, ComponentsType.invoiceContent);
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
  const fields = EditInvoiceContentDetailsFormField(
    register,
    loading,
    control,
    handleBack
  );
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onClick(2, ComponentsType.invoiceContent);
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
