import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateUpdateNoteValidation } from "@/validation/modalsSchema";
import { updateNote } from "@/api/slices/noteSlice/noteSlice";
import { FilterType } from "@/types";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import { setContractDetails } from "@/api/slices/contract/contractSlice";
import { setInvoiceDetails } from "@/api/slices/invoice/invoiceSlice";
import { useEffect } from "react";
import { UpdateNoteFormField } from "@/components/leads/fields/update-note-form-fields";

export const useUpdateNote = ({
  handleNotes,
  handleFilterChange,
  filter,
}: {
  handleNotes: (id: string) => void;
  handleFilterChange?: (query: FilterType) => void;
  filter?: FilterType;
}) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.note);
  const { lead, leadDetails } = useAppSelector((state) => state.lead);
  const { offer, offerDetails } = useAppSelector((state) => state.offer);
  const { contract, contractDetails } = useAppSelector(
    (state) => state.contract
  );

  const { invoice, invoiceDetails } = useAppSelector((state) => state.invoice);

  const {
    modal: {
      data: { id, type, data },
    },
  } = useAppSelector((state) => state.global);

  const schema = generateUpdateNoteValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (data) setValue("description", data);
  }, [data]);

  const fields = UpdateNoteFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    let res;

    res = await dispatch(
      updateNote({
        data: { ...formData, id: id, type: type },
        router,
        setError,
        translate,
      })
    );

    if (res?.payload) {
      switch (type) {
        case "lead":
          const isFilterLead = lead.find((item) => item.id === id);
          if (!isFilterLead?.isNoteCreated && handleFilterChange)
            handleFilterChange(filter || {});
          handleNotes(leadDetails?.id);
          break;
        case "offer":
          const isFilterOffer = offer.find((item) => item.id === id);
          if (!isFilterOffer?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(offerDetails?.id);
          } else {
            dispatch(setOfferDetails({ ...offerDetails, isNoteCreated: true }));
            handleNotes(offerDetails?.id);
          }

          break;
        case "contract":
          const isFilterContract = contract.find((item) => item.id === id);
          if (!isFilterContract?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(contractDetails?.id);
          } else {
            dispatch(
              setContractDetails({ ...contractDetails, isNoteCreated: true })
            );
            handleNotes(contractDetails?.id);
          }

          break;
        case "invoice":
          const isFilterInvoice = invoice.find((item) => item.id === id);
          if (!isFilterInvoice?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(invoiceDetails?.id);
          } else {
            dispatch(
              setInvoiceDetails({ ...invoiceDetails, isNoteCreated: true })
            );
            handleNotes(invoiceDetails?.id);
          }

          break;
        default:
          break;
      }
    }
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
