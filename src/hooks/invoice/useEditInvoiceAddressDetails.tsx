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
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { useEffect, useState } from "react";
import { updateInvoiceDetials } from "@/api/slices/invoice/invoiceSlice";
import { EditInvoiceAddressDetailsFormField } from "@/components/invoice/edit/fields/edit-invoice-address-details-fields";
import { generateCreateInvoiceAddressDetailsValidation } from "@/validation/invoiceSchema";
import { readAddressSettings } from "@/api/slices/settingSlice/settings";

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

  const { addressSettings } = useAppSelector((state) => state.settings);

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
    dispatch(readAddressSettings());
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
              country: "",
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

  const handleChangeLabel = (item: string, index: number) => {
    setValue(`address.${index}.label`, item);
  };

  const fields = EditInvoiceAddressDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    addressFields?.length === 0 ? addressType?.length : addressFields?.length,
    handleChangeLabel,
    append,
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
