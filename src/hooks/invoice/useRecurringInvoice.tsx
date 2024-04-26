import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateCreateRecurringInvoiceValidationSchema } from "@/validation/invoiceSchema";
import {
  createRecuringInvoice,
  readInvoiceDetails,
} from "@/api/slices/invoice/invoiceSlice";
import { staticEnums } from "@/utils/static";
import { CreateRecurringInvoiceFormField } from "@/components/invoice/fields/create-recurring-invoice";

export default function useRecurringInvoice(invoiceCreated: () => void) {
  const router = useRouter();
  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );

  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const createdInvoiceSchema =
    generateCreateRecurringInvoiceValidationSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(createdInvoiceSchema),
  });

  const fields = CreateRecurringInvoiceFormField(
    register,
    loading,
    control,
    false,
    invoiceDetails
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      ["paymentType"]: staticEnums["PaymentType"][data.paymentType],
      id: invoiceDetails?.id,
      isInvoiceRecurring: true,
      amount: invoiceDetails.contractID?.offerID?.total,
    };
    const res = await dispatch(
      createRecuringInvoice({ data: apiData, router, setError, translate })
    );
    if (res?.payload) {
      dispatch(readInvoiceDetails({ params: { filter: invoiceDetails?.id } }));

      invoiceCreated();
    }
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
