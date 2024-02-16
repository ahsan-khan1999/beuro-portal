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
  const remainingAmount = invoiceDetails?.total
  console.log(remainingAmount,"remainingAmount");
  
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

    taxPercentage = calculateTax(Number(remainingAmount), amount)
    if (type === '0') {
      if (remainingAmount < amount) {
        setValue("amount", remainingAmount?.toFixed(2))
        setValue("remainingAmount", (remainingAmount - amount).toFixed(2))

      } else if (invoiceDetails?.paidAmount === amount) {
        setValue("remainingAmount", remainingAmount.toFixed(2))

      } else {
        setValue("remainingAmount", (remainingAmount - amount).toFixed(2))


      }
    }
    else if (type === '1') {
      if (Number(remainingAmount) < taxPercentage) {
        setValue("remainingAmount", (remainingAmount).toFixed(2))
        setValue("amount", 100)

      } else {
        setValue("remainingAmount", (Number(remainingAmount) - taxPercentage).toFixed(2))
      }
    } else {
      setValue("remainingAmount", remainingAmount.toFixed(2))

    }
  }, [amount, type]);


  useEffect(() => {
    reset({
      amount: data?.amount,
      type: "0",

    })

  }, [data?.id])


  const onSubmit: SubmitHandler<FieldValues> = async (reqData) => {
    const apiData = {
      ...reqData, ["paymentType"]: staticEnums["PaymentType"][reqData.paymentType], id: data?.id, isInvoiceRecurring: invoiceDetails?.isInvoiceRecurring || false,
      amount: reqData?.type === "1" ? calculateTax(Number(reqData?.remainingAmount),reqData?.amount) : reqData?.amount

    }

    const res = await dispatch(updateParentInvoice({ data: apiData, router, setError, translate }));
    if (res?.payload) {
      dispatch(readInvoiceDetails({ params: { filter: invoiceDetails?.id } }))

      invoiceCreated();
    }
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
