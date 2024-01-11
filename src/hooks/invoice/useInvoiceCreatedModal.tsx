import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateCreateInvoiceValidationSchema } from "@/validation/invoiceSchema";
import { CreateInvoiceFormField } from "@/components/invoice/fields/create-invoice-fields";
import {
  createInvoice,
  readInvoiceDetails,
  updateInvoice,
  updateParentInvoice,
} from "@/api/slices/invoice/invoiceSlice";
import { useMemo } from "react";
import { calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import React, { useEffect } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
export default function useInvoiceCreatedModal(invoiceCreated: Function) {
  const router = useRouter();
  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );

  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const createdInvoiceSchema = generateCreateInvoiceValidationSchema(translate);
  let taxPercentage = 0
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(createdInvoiceSchema),
  });
  const amount = watch("amount");
  const type = watch("type");
  useEffect(() => {
    setValue("type", "0")
    // setValue("amount", 0)


  }, [])

  const fields = CreateInvoiceFormField(
    register,
    loading,
    control,
    false,
    invoiceDetails,
    type
  );
  useMemo(() => {
    const remainingAmount = invoiceDetails?.invoiceCreatedAmount - Number(invoiceDetails?.paidAmount)
    taxPercentage = calculateTax(Number(remainingAmount), amount)
    if (type === '0') {
      if (remainingAmount < amount) {
        setValue("amount", remainingAmount)
        setValue("remainingAmount", remainingAmount - (amount || 0))

      } else {
        setValue("remainingAmount", remainingAmount - (amount || 0))
      }
    }
    else if (type === '1') {
      if (Number(remainingAmount) < taxPercentage) {
        setValue("remainingAmount", remainingAmount)
        setValue("amount", 100)

      } else {
        setValue("remainingAmount", Number(remainingAmount) - taxPercentage)
      }
    } else {
      setValue("remainingAmount", remainingAmount)

    }
  }, [amount, type]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      ["paymentType"]: staticEnums["PaymentType"][data.paymentType],
      id: invoiceDetails?.id,
      isInvoiceRecurring: false,
      amount: data?.type === "1" ? taxPercentage : data?.amount
    };
    const res = await dispatch(
      createInvoice({ data: apiData, router, setError, translate })
    );
    if (res?.payload) invoiceCreated();
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    translate,
  };
}
