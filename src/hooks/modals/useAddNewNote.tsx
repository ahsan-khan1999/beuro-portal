import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNoteFormField } from "@/components/leads/fields/Add-note-fields";
import { generateAddNewNoteValidation } from "@/validation/modalsSchema";
import { createLeadNotes, setLeads } from "@/api/slices/lead/leadSlice";
import { createNote, updateNote } from "@/api/slices/noteSlice/noteSlice";
import { FilterType } from "@/types";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import { setContractDetails } from "@/api/slices/contract/contractSlice";
import { setInvoiceDetails } from "@/api/slices/invoice/invoiceSlice";
import { useEffect } from "react";

export const useAddNewNote = ({
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
  const { lead ,leadDetails} = useAppSelector((state) => state.lead);
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

  const schema = generateAddNewNoteValidation(translate);
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
    if (data) setValue("description", data)
  }, [data])

  const fields = AddNoteFormField(register, loading, control);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    let res;
    if (!data) {
      res = await dispatch(
        createNote({
          data: { ...formData, id: id, type: type },
          router,
          setError,
          translate,
        })
      );
    } else {
      res = await dispatch(
        updateNote({
          data: { ...formData, id: id, type: type },
          router,
          setError,
          translate,
        })
      );
    }

    
    if (res?.payload) {
      switch (type) {
        case "lead":
          const isFilterLead = lead.find((item) => item.id === id);
          if (!isFilterLead?.isNoteCreated && handleFilterChange)
            handleFilterChange(filter || {});
          break;
        case "offer":
          const isFilterOffer = offer.find((item) => item.id === id);
          if (!isFilterOffer?.isNoteCreated && handleFilterChange)
            handleFilterChange(filter || {});
          else
            dispatch(setOfferDetails({ ...offerDetails, isNoteCreated: true }));

          break;
        case "contract":
          const isFilterContract = contract.find((item) => item.id === id);
          if (!isFilterContract?.isNoteCreated && handleFilterChange)
            handleFilterChange(filter || {});
          else
            dispatch(
              setContractDetails({ ...contractDetails, isNoteCreated: true })
            );

          break;
        case "invoice":
          const isFilterInvoice = invoice.find((item) => item.id === id);
          if (!isFilterInvoice?.isNoteCreated && handleFilterChange)
            handleFilterChange(filter || {});
          else
            dispatch(
              setInvoiceDetails({ ...invoiceDetails, isNoteCreated: true })
            );

          break;
        default:
          break;
      }
      if (!data){
        handleNotes(id);

      }else{
        handleNotes(leadDetails?.id);

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
