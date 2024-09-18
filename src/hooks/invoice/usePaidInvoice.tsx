import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  readInvoiceDetails,
  updateInvoiceStatus,
} from "@/api/slices/invoice/invoiceSlice";
import { staticEnums } from "@/utils/static";
import { PaidDateInvoiceFormField } from "@/components/invoice/details/invoice/paid-invoice-date-field";
import { generatePaidDateInvoiceValidation } from "@/validation/invoiceSchema";
import { useRouter } from "next/router";

export interface PaidInvoiceProps {
  onSuccess: () => void;
}

export default function usePaidInvoice({ onSuccess }: PaidInvoiceProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

  const { id, status } = useAppSelector(
    (state) => state.global.modal.data ?? {}
  );

  const invoiceID = router.query.invoice;

  const schema = generatePaidDateInvoiceValidation(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = PaidDateInvoiceFormField(register);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await dispatch(
      updateInvoiceStatus({
        data: {
          id: id,
          invoiceStatus: staticEnums["InvoiceStatus"][status],
          data,
        },
      })
    );
    if (res?.payload) {
      dispatch(readInvoiceDetails({ params: { filter: invoiceID } }));
      onSuccess();
    }
  };

  return {
    handleSubmit,
    errors,
    fields,
    onSubmit,
    translate,
  };
}
