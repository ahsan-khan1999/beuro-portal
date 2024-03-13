import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferAddressDetailsFormField } from "@/components/offers/edit/fields/Offer-address-edit-fields";
import { generateOfferAddressEditDetailsValidation } from "@/validation/offersSchema";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { useEffect, useMemo, useState } from "react";
import { AddOffAddressDetailsFormField } from "@/components/offers/add/fields/add-address-details-fields";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { updateInvoiceDetials } from "@/api/slices/invoice/invoiceSlice";

export const useEditInvoiceAddressDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );

  const [addressType, setAddressType] = useState(
    invoiceDetails?.addressID
      ? Array.from(invoiceDetails?.addressID?.address, () => false)
      : invoiceDetails?.customerDetail?.address
      ? Array.from([invoiceDetails?.customerDetail?.address], () => false)
      : [false] || [false]
  );
  const handleBack = () => {
    handleNext(EditComponentsType.offerEdit);
  };

  const schema = generateOfferAddressEditDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (invoiceDetails.id) {
      reset({
        address: invoiceDetails?.addressID
          ? invoiceDetails?.addressID?.address?.map((item, index) => ({
              ...item,
              label: item?.label ? item?.label : `Adresse ${++index}`,
            }))
          : invoiceDetails?.customerDetail?.address
          ? [
              {
                label: `Adresse ${1}`,
                ...invoiceDetails?.customerDetail?.address,
              },
            ]
          : addressType?.map((item, index) => ({
              streetNumber: "",
              postalCode: "",
              country: "Switzerland",
              description: "",
              label: `Adresse ${++index}`,
            })),
      });
    }
  }, [invoiceDetails.id]);
  const {
    fields: addressFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "address",
  });

  const handleFieldTypeChange = (index: number) => {
    let address = [...addressType];
    address[index] = !address[index];
    setAddressType(address);
  };
  const fields = AddOffAddressDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    addressFields?.length === 0 ? addressType?.length : addressFields?.length,
    append,
    remove,
    addressFields,
    handleFieldTypeChange,
    addressType,
    setValue
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 2,
      id: invoiceDetails?.id,
      stage: EditComponentsType.serviceEdit,
    };
    const response = await dispatch(
      updateInvoiceDetials({ data: apiData, router, setError, translate })
    );
    if (response?.payload) handleNext(EditComponentsType.serviceEdit);
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDetails,
  };
};
