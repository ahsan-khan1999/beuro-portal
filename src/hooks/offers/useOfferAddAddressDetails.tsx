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
import { generateOfferAddressEditDetailsValidation } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useState, useEffect } from "react";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { readAddressSettings } from "@/api/slices/settingSlice/settings";
import { addressObject } from "@/components/offers/add/fields/add-address-details-fields";

export const useOfferAddAddressDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );

  const { addressSettings } = useAppSelector((state) => state.settings);

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

  const schema = generateOfferAddressEditDetailsValidation(translate);

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
    defaultValues: {
      address: offerDetails?.addressID
        ? offerDetails?.addressID?.address?.map((item, index) => ({
            ...item,
            label: item?.label ? item?.label : `Adresse ${++index}`,
          }))
        : offerDetails?.leadID?.addressID
        ? offerDetails?.leadID?.addressID?.address?.map((item, index) => ({
            ...item,
            label: item?.label ? item?.label : `Addresse ${++index}`,
          }))
        : offerDetails?.leadID?.customerDetail?.address
        ? [
            {
              ...offerDetails?.leadID?.customerDetail?.address,
              label: `Addresse ${1}`,
              addressType: "",
            },
          ]
        : addressType?.map((item, index) => ({
            streetNumber: "",
            postalCode: "",
            country: "",
            description: "",
            label: `Adresse ${++index}`,
          })),
    },
  });

  useEffect(() => {
    dispatch(readAddressSettings());
  }, []);

  // useEffect(() => {
  //   if (offerDetails.id) {
  //     reset({
  //       address: offerDetails?.addressID
  //         ? offerDetails?.addressID?.address?.map((item, index) => ({
  //             ...item,
  //             label: item?.label ? item?.label : `Adresse ${++index}`,
  //           }))
  //         : offerDetails?.leadID?.addressID
  //         ? offerDetails?.leadID?.addressID?.address?.map((item, index) => ({
  //             ...item,
  //             label: item?.label ? item?.label : `Addresse ${++index}`,
  //           }))
  //         : offerDetails?.leadID?.customerDetail?.address
  //         ? [
  //             {
  //               ...offerDetails?.leadID?.customerDetail?.address,
  //               label: `Addresse ${1}`,
  //               addressType: "",
  //             },
  //           ]
  //         : addressType?.map((item, index) => ({
  //             streetNumber: "",
  //             postalCode: "",
  //             country: "",
  //             description: "",
  //             label: `Adresse ${++index}`,
  //           })),
  //     });
  //   }
  // }, [offerDetails?.id, addressSettings?.id]);

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

  const handleChangeLabel = (item: string, index: number) => {
    setValue(`address.${index}.label`, item);
  };

  const addressFieldsLength = addressFields.length || 1;

  const handleAddNewAddress = () => {
    append(addressObject);
    const currentAddressItem = addressSettings?.addresses[addressFieldsLength];

    setValue(
      `address.${addressFieldsLength}.addressType`,
      ``
      // currentAddressItem || `Address ${addressFieldsLength}`
    );

    setValue(
      `address.${addressFieldsLength}.label`,
      `Addresse ${addressFieldsLength + 1}`
    );
  };

  const fields = AddOffAddressDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    addressFields?.length === 0 ? addressType?.length : addressFields?.length,
    handleChangeLabel,
    handleAddNewAddress,
    // append,
    remove,
    addressFields,
    handleFieldTypeChange,
    addressType,
    setValue,
    getValues,
    addressSettings
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
