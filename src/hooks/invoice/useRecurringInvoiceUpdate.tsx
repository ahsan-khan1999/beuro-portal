import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateCreateInvoiceValidationSchema, generateRecurringInvoiceValidationSchema } from "@/validation/invoiceSchema";
import { CreateInvoiceFormField } from "@/components/invoice/fields/create-invoice-fields";
import { createInvoice, readInvoiceDetails, updateInvoice, updateParentInvoice } from "@/api/slices/invoice/invoiceSlice";
import { useMemo } from "react";
import { calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import React, { useEffect } from 'react'
import { updateModalType } from "@/api/slices/globalSlice/global";
import { RecurringInvoiceFormField } from "@/components/invoice/fields/recurring-invoice-fields";
export default function useRecurringInvoiceUpdateModal(invoiceCreated: Function) {
  const router = useRouter();
  const { loading, error, invoiceDetails } = useAppSelector((state) => state.invoice);
  const { modal: { data } } = useAppSelector((state) => state.global);

  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const createdInvoiceSchema = generateRecurringInvoiceValidationSchema(translate);

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

  const fields = RecurringInvoiceFormField(
    register,
    loading,
    control,
    false,
    invoiceDetails,
    "",
    data
  );

  const onSubmit: SubmitHandler<FieldValues> = async (reqData) => {
    const apiData = { ...reqData, ["paymentType"]: staticEnums["PaymentType"][reqData.paymentType], id: data?.id, isInvoiceRecurring: invoiceDetails?.isInvoiceRecurring }
    const res = await dispatch(updateParentInvoice({ data: apiData, router, setError, translate }));
    if (res?.payload) {
      dispatch(readInvoiceDetails({ params: { filter: invoiceDetails?.id } }))
      
      invoiceCreated();}
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
