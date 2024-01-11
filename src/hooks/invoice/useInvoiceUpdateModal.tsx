import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateCreateInvoiceValidationSchema } from "@/validation/invoiceSchema";
import { CreateInvoiceFormField } from "@/components/invoice/fields/create-invoice-fields";
import { createInvoice, readInvoiceDetails, updateInvoice, updateParentInvoice } from "@/api/slices/invoice/invoiceSlice";
import { useMemo } from "react";
import { calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import React, { useEffect } from 'react'
import { updateModalType } from "@/api/slices/globalSlice/global";
export default function useInvoiceUpdateModal(invoiceCreated: Function) {
  const router = useRouter();
  const { loading, error, invoiceDetails } = useAppSelector((state) => state.invoice);
  const { modal: { data } } = useAppSelector((state) => state.global);

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
    setError, setValue,
    reset
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(createdInvoiceSchema),
  });
  const amount = watch("amount");
  const type = watch("type");

  const fields = CreateInvoiceFormField(
    register,
    loading,
    control,
    false,
    invoiceDetails,
    type,
    data
  );

  useMemo(() => {
    const remainingAmount = invoiceDetails?.invoiceCreatedAmount  - Number(invoiceDetails?.paidAmount)
    taxPercentage = calculateTax(Number(remainingAmount), amount)
    if (type === '0') {
      if (remainingAmount < amount) {
        setValue("amount", invoiceDetails?.paidAmount)
        setValue("remainingAmount", remainingAmount - amount)

      } else if (invoiceDetails?.paidAmount === amount) {
        setValue("remainingAmount", remainingAmount)

      } else {
        setValue("remainingAmount", remainingAmount - amount)

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


  useEffect(() => {
    reset({
      amount: data?.amount,
      type: "0",

    })

  }, [data?.id])


  const onSubmit: SubmitHandler<FieldValues> = async (reqData) => {
    const apiData = { ...reqData, ["paymentType"]: staticEnums["PaymentType"][reqData.paymentType], id: data?.id, isInvoiceRecurring: invoiceDetails?.isInvoiceRecurring || false }

    const res = await dispatch(updateParentInvoice({ data: apiData, router, setError, translate }));
    if (res?.payload) invoiceCreated();
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
