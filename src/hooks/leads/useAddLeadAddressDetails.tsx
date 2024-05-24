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
import { AddLeadAddressDetailsFormField } from "@/components/leads/fields/Add-lead-address-fields";
import { generateLeadsAddressEditDetailsValidation } from "@/validation/leadsSchema";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useEffect, useMemo, useState } from "react";
import { readAddressSettings } from "@/api/slices/settingSlice/settings";
import { addressObject } from "@/components/offers/add/fields/add-address-details-fields";

export const useAddLeadAddressDetails = (
  onHandleNext: (currentComponent: ComponentsType) => void
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { addressSettings } = useAppSelector((state) => state.settings);
  const [addressType, setAddressType] = useState([false, false]);
  const [addressCount, setAddressCount] = useState(
    leadDetails?.addressID?.address?.length || 1
  );

  const schema = generateLeadsAddressEditDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    dispatch(readAddressSettings());
  }, []);

  useEffect(() => {
    if (leadDetails?.id) {
      reset({
        address: leadDetails?.addressID
          ? leadDetails?.addressID?.address?.map((item, index) => ({
              ...item,
              label: item?.label ? item?.label : `Adresse ${++index}`,
            }))
          : [
              {
                label: addressSettings?.addresses[0] || `Adresse ${1}`,
                addressType: addressSettings?.addresses[0] || "",
                ...leadDetails?.customerDetail?.address,
              },
            ],
      });
    }
  }, [leadDetails?.id, addressSettings?.id]);

  const {
    append,
    fields: addressFields,
    remove,
  } = useFieldArray({ control, name: "address" });

  const addressFieldsLength = addressFields.length || 1;

  const handleFieldTypeChange = (index: number) => {
    const updatedAddressType = [...addressType];
    updatedAddressType[index] = !updatedAddressType[index];
    setAddressType(updatedAddressType);
  };

  const handleBack = () => {
    onHandleNext(ComponentsType.customerAdd);
  };

  const handleChangeLabel = (item: string, index: number) => {
    setValue(`address.${index}.label`, item);
  };
  // console.log(addressFields, "addressFieldsLength");

  const handleAddNewAddress = () => {
    append(addressObject);
    const currentAddressItem = addressSettings?.addresses[addressFieldsLength];
    console.log(currentAddressItem, "currentAddressItem");

    setValue(
      `address.${addressFieldsLength}.addressType`,
      currentAddressItem || `Address ${addressFieldsLength}`
    );
    setValue(
      `address.${addressFieldsLength}.label`,
      currentAddressItem || `Address ${addressFieldsLength}`
    );
  };

  const fields = AddLeadAddressDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    addressFieldsLength,
    handleChangeLabel,
    handleAddNewAddress,
    remove,
    addressFields,
    handleFieldTypeChange,
    addressType,
    setValue,
    getValues,
    addressSettings
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const apiData = {
    //   address: senitizeDataForm(data).slice(0, addressCount),
    //   step: 2,
    //   id: leadDetails?.id,
    //   stage: ComponentsType.serviceAdd,
    // };

    const apiData = {
      ...data,
      step: 2,
      id: leadDetails?.id,
      stage: ComponentsType.addressAdd,
    };

    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onHandleNext(ComponentsType.serviceAdd);
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
