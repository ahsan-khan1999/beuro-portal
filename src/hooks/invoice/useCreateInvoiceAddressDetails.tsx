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
import { AddOffAddressDetailsFormField } from "@/components/offers/add/fields/add-address-details-fields";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useState, useEffect } from "react";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { generateCreateInvoiceAddressDetailsValidation } from "@/validation/invoiceSchema";

export const useCreateInvoiceAddressDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );

  const [addressType, setAddressType] = useState(
    offerDetails?.addressID
      ? Array.from(offerDetails?.addressID?.address, () => false)
      : offerDetails?.leadID?.addressID?.address
      ? Array.from(offerDetails?.leadID?.addressID?.address, () => false)
      : [false] || [false]
  );

  const handleBack = () => {
    onHandleNext(ComponentsType.customerAdded);
  };

  const schema = generateCreateInvoiceAddressDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (offerDetails.id) {
      reset({
        address: offerDetails?.addressID
          ? offerDetails?.addressID?.address?.map((item, index) => ({
              ...item,
              label: item?.label ? item?.label : `Adresse ${++index}`,
            }))
          : offerDetails?.leadID?.addressID
          ? offerDetails?.leadID?.addressID?.address?.map((item, index) => ({
              ...item,
              label: item?.label ? item?.label : `Address ${++index}`,
            }))
          : offerDetails?.leadID?.customerDetail?.address
          ? [
              {
                ...offerDetails?.leadID?.customerDetail?.address,
                label: `Adresse ${1}`,
              },
            ]
          : addressType?.map((item, index) => ({
              streetNumber: "",
              postalCode: "",
              country: "Schweiz",
              description: "",
              label: `Adresse ${++index}`,
            })),
      });
    }
  }, [offerDetails?.id]);

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
    setValue,
    getValues
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 2,
      id: offerDetails?.id,
      stage: ComponentsType.serviceAdded,
    };
    const response = await dispatch(
      updateOffer({ data: apiData, router, setError, translate })
    );

    if (response?.payload) onHandleNext(ComponentsType.serviceAdded);
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    offerDetails,
  };
};
