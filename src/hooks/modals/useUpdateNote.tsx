import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { staticEnums } from "@/utils/static";

export interface UpdateNoteProps {
  handleNotes: (id: string, refID: string, name: string) => void;
  handleFilterChange?: (query: FilterType) => void;
  filter?: FilterType;
}

export const useUpdateNote = ({
  handleNotes,
  handleFilterChange,
  filter,
}: UpdateNoteProps) => {
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

  const leadCustomerType = leadDetails?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];
  const leadName =
    leadCustomerType === 1
      ? leadDetails?.customerDetail?.companyName
      : leadDetails?.customerDetail?.fullName;

  const offerCustomerType = offerDetails?.leadID?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];
  const offerName =
    offerCustomerType === 1
      ? offerDetails?.leadID?.customerDetail?.companyName
      : offerDetails?.leadID?.customerDetail?.fullName;

  const contractCustomerType = contractDetails?.offerID?.leadID?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];
  const contractName =
    contractCustomerType === 1
      ? contractDetails?.offerID?.leadID?.customerDetail?.companyName
      : contractDetails?.offerID?.leadID?.customerDetail?.fullName;

  const invoiceCustomerType = invoiceDetails?.customerDetail
    ?.customerType as keyof (typeof staticEnums)["CustomerType"];
  const invoiceName =
    invoiceCustomerType === 1
      ? invoiceDetails?.customerDetail?.companyName
      : invoiceDetails?.customerDetail?.fullName;

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
          handleNotes(leadDetails?.id, leadDetails?.refID, leadName);
          break;
        case "offer":
          const isFilterOffer = offer.find((item) => item.id === id);
          if (!isFilterOffer?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(offerDetails?.id, offerDetails?.offerNumber, offerName);
          } else {
            dispatch(setOfferDetails({ ...offerDetails, isNoteCreated: true }));
            handleNotes(offerDetails?.id, offerDetails?.offerNumber, offerName);
          }

          break;
        case "contract":
          const isFilterContract = contract.find((item) => item.id === id);
          if (!isFilterContract?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(
              contractDetails?.id,
              contractDetails?.contractNumber,
              contractName
            );
          } else {
            dispatch(
              setContractDetails({ ...contractDetails, isNoteCreated: true })
            );
            handleNotes(
              contractDetails?.id,
              contractDetails?.contractNumber,
              contractName
            );
          }

          break;
        case "invoice":
          const isFilterInvoice = invoice.find((item) => item.id === id);
          if (!isFilterInvoice?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(
              invoiceDetails?.id,
              invoiceDetails?.invoiceNumber,
              invoiceName
            );
          } else {
            dispatch(
              setInvoiceDetails({ ...invoiceDetails, isNoteCreated: true })
            );
            handleNotes(
              invoiceDetails?.id,
              invoiceDetails?.invoiceNumber,
              invoiceName
            );
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
