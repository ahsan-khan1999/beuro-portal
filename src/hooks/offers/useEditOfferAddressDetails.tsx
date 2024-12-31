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
import { generateOfferAddressEditDetailsValidation } from "@/validation/offersSchema";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { useEffect, useState } from "react";
import {
  AddOffAddressDetailsFormField,
  addressObject,
} from "@/components/offers/add/fields/add-address-details-fields";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { readAddressSettings } from "@/api/slices/settingSlice/settings";

export const useEditOfferAddressDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
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
            label: item?.label ? item?.label : `Adresse ${++index}`,
          }))
        : offerDetails?.leadID?.customerDetail?.address
        ? [
            {
              ...offerDetails?.leadID?.customerDetail?.address,
              label: `Adresse ${1}`,
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

  const addressFieldsLength = addressFields?.length || 1;

  const handleAddNewAddress = () => {
    append(addressObject);
    setValue(`address.${addressFieldsLength}.addressType`, ``);
    setValue(
      `address.${addressFieldsLength}.label`,
      `Adresse ${addressFieldsLength + 1}`
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
      stage: EditComponentsType.serviceEdit,
    };
    const response = await dispatch(
      updateOffer({ data: apiData, router, setError, translate })
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
    offerDetails,
  };
};
