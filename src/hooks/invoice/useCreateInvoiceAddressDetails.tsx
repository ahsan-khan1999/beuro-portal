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
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useState, useEffect } from "react";
import { generateCreateInvoiceAddressDetailsValidation } from "@/validation/invoiceSchema";
import { updateMainInvoice } from "@/api/slices/invoice/invoiceSlice";
import { CreateInvoiceAddressDetailsFormField } from "@/components/invoice/createInvoice/fields/create-invoice-address-details-fields";
import { readAddressSettings } from "@/api/slices/settingSlice/settings";
import { addressObject } from "@/components/offers/add/fields/add-address-details-fields";

export const useCreateInvoiceAddressDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );

  const { addressSettings } = useAppSelector((state) => state.settings);

  const [addressType, setAddressType] = useState(
    invoiceDetails?.addressID
      ? Array.from(invoiceDetails?.addressID?.address, () => false)
      : invoiceDetails?.addressID?.address
      ? Array.from(invoiceDetails?.addressID?.address, () => false)
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
    defaultValues: {
      address: invoiceDetails?.addressID
        ? invoiceDetails?.addressID?.address?.map((item, index) => ({
            ...item,
            label: item?.label ? item?.label : `Adresse ${++index}`,
          }))
        : invoiceDetails?.addressID
        ? invoiceDetails?.addressID?.address?.map((item, index) => ({
            ...item,
            label: item?.label ? item?.label : `Adresse ${++index}`,
          }))
        : invoiceDetails?.customerDetail?.address
        ? [
            {
              ...invoiceDetails?.customerDetail?.address,
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

  const addressFieldsLength = addressFields.length || 1;

  const handleAddNewAddress = () => {
    append(addressObject);
    // const currentAddressItem = addressSettings?.addresses[addressFieldsLength];

    setValue(
      `address.${addressFieldsLength}.addressType`,
      ``
      // currentAddressItem || `Address ${addressFieldsLength}`
    );
    setValue(
      `address.${addressFieldsLength}.label`,
      `Adresse ${addressFieldsLength + 1}`
    );
  };

  const fields = CreateInvoiceAddressDetailsFormField(
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
      id: invoiceDetails?.id,
      stage: ComponentsType.serviceAdded,
    };
    const response = await dispatch(
      updateMainInvoice({ data: apiData, router, setError, translate })
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
    invoiceDetails,
  };
};
