import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateCreateInvoiceValidationSchema } from "@/validation/invoiceSchema";
import { CreateInvoiceFormField } from "@/components/invoice/fields/create-invoice-fields";
import { createInvoice, updateInvoice, updateParentInvoice } from "@/api/slices/invoice/invoiceSlice";
import { useMemo } from "react";
import { calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import React, { useEffect } from 'react'
import { updateModalType } from "@/api/slices/globalSlice/global";
export default function useInvoiceCreatedModal(invoiceCreated: Function) {
  const router = useRouter();
  const { loading, error, invoiceDetails } = useAppSelector((state) => state.invoice);

  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const createdInvoiceSchema = generateCreateInvoiceValidationSchema(translate);

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
  useEffect(() => {
    setValue("type","0")
    setValue("amount",0)

  }, [])
    
  const fields = CreateInvoiceFormField(
    register,
    loading,
    control,
    false,
    invoiceDetails,
    type,
  );
  useMemo(() => {
    if (type === '0') {
      if (invoiceDetails?.contractID?.offerID?.total < amount) {
        setValue("remainingAmount", invoiceDetails?.contractID?.offerID?.total - amount)
        setValue("amount", invoiceDetails?.contractID?.offerID?.total)

      } else {
        setValue("remainingAmount", invoiceDetails?.contractID?.offerID?.total - amount)
      }
    }
    else if (type === '1') {
      if (invoiceDetails?.contractID?.offerID?.total < calculateTax(invoiceDetails?.contractID?.offerID?.total, amount)) {
        setValue("remainingAmount", invoiceDetails?.contractID?.offerID?.total)
        setValue("amount", 100)

      } else {
        setValue("remainingAmount", invoiceDetails?.contractID?.offerID?.total - calculateTax(invoiceDetails?.contractID?.offerID?.total, amount))
      }
    } else {
      setValue("remainingAmount", invoiceDetails?.contractID?.offerID?.total)

    }
  }, [amount, type])
  

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, ["paymentType"]: staticEnums["PaymentType"][data.paymentType], id: invoiceDetails?.id, isInvoiceRecurring: false }
    const res = await dispatch(createInvoice({ data: apiData, router, setError, translate }));
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
