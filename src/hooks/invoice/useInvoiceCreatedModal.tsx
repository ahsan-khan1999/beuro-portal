import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateCreateInvoiceValidationSchema } from "@/validation/invoiceSchema";
import { CreateInvoiceFormField } from "@/components/invoice/fields/create-invoice-fields";

export default function useInvoiceCreatedModal(invoiceCreated: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const createdInvoiceSchema = generateCreateInvoiceValidationSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(createdInvoiceSchema),
  });
  const markItRecuring = watch("markItRecuring");
  const fields = CreateInvoiceFormField(
    register,
    loading,
    control,
    markItRecuring
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(resetPassword({ router, data }));
    invoiceCreated();
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
