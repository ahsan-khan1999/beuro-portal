import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNoteFormField } from "@/components/leads/fields/Add-note-fields";
import { generateAddNewNoteValidation } from "@/validation/modalsSchema";
import { createNote } from "@/api/slices/noteSlice/noteSlice";
import { FilterType } from "@/types";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import { setContractDetails } from "@/api/slices/contract/contractSlice";
import { setInvoiceDetails } from "@/api/slices/invoice/invoiceSlice";
import { useEffect } from "react";
import { NoteSetting } from "@/api/slices/settingSlice/settings";
import { staticEnums } from "@/utils/static";

export interface AddNoteProps {
  handleNotes: (
    id: string,
    refID: string,
    name: string,
    heading: string
  ) => void;
  handleFilterChange?: (query: FilterType) => void;
  filter?: FilterType;
  id?: string;
}

export const useAddNewNote = ({
  handleNotes,
  handleFilterChange,
  filter,
  id: leadId,
}: AddNoteProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.note);
  const { lead, leadDetails } = useAppSelector((state) => state.lead);
  const { offer, offerDetails } = useAppSelector((state) => state.offer);
  const { contract, contractDetails } = useAppSelector(
    (state) => state.contract
  );
  const { invoice, invoiceDetails } = useAppSelector((state) => state.invoice);
  const { noteSettings } = useAppSelector((state) => state.settings);
  console.log(noteSettings, "noteSettings");
  console.log(leadId, "leadId");

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

  const leadHeading =
    leadCustomerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");
  const offerHeading =
    offerCustomerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");
  const contractHeading =
    contractCustomerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");
  const invoiceHeading =
    invoiceCustomerType === 1
      ? translate("common.company_name")
      : translate("common.customer_name");

  const schema = generateAddNewNoteValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const reversedNoteSettings = noteSettings?.slice().reverse() || [];

  const onNoteSelect = (id: string) => {
    const filteredNote = noteSettings?.find(
      (item: NoteSetting) => item.notes.noteType === id
    );
    if (filteredNote) {
      setValue("description", filteredNote?.notes?.description);
      trigger("description");
    }
  };

  const fields = AddNoteFormField(register, loading, control, {
    noteSetting: noteSettings,
    onNoteSelect,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    let res;
    if (!data) {
      res = await dispatch(
        createNote({
          data: { ...formData, id: id ? id : leadId, type: type },
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
          handleNotes(
            leadId ? leadId : leadDetails?.id,
            leadDetails?.refID,
            leadName,
            leadHeading
          );
          break;
        case "offer":
          const isFilterOffer = offer.find((item) => item.id === id);
          if (!isFilterOffer?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(
              offerDetails?.id,
              offerDetails?.offerNumber,
              offerName,
              offerHeading
            );
          } else {
            dispatch(setOfferDetails({ ...offerDetails, isNoteCreated: true }));
            handleNotes(
              offerDetails?.id,
              offerDetails?.offerNumber,
              offerName,
              offerHeading
            );
          }

          break;
        case "contract":
          const isFilterContract = contract.find((item) => item.id === id);
          if (!isFilterContract?.isNoteCreated && handleFilterChange) {
            handleFilterChange(filter || {});
            handleNotes(
              contractDetails?.id,
              contractDetails?.contractNumber,
              contractName,
              contractHeading
            );
          } else {
            dispatch(
              setContractDetails({ ...contractDetails, isNoteCreated: true })
            );
            handleNotes(
              contractDetails?.id,
              contractDetails?.contractNumber,
              contractName,
              contractHeading
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
              invoiceName,
              invoiceHeading
            );
          } else {
            dispatch(
              setInvoiceDetails({ ...invoiceDetails, isNoteCreated: true })
            );
            handleNotes(
              invoiceDetails?.id,
              invoiceDetails?.invoiceNumber,
              invoiceName,
              invoiceHeading
            );
          }

          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (noteSettings)
      setValue("description", reversedNoteSettings[0]?.notes?.description);
  }, []);

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
