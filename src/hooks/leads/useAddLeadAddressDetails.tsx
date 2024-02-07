import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  UseFieldArrayRemove,
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

export const useAddLeadAddressDetails = (
  onHandleNext: (currentComponent: ComponentsType) => void
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { customerDetails } = useAppSelector((state) => state.customer);
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
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (leadDetails?.id) {
      reset({
        address: leadDetails?.addressID
          ? leadDetails?.addressID?.address?.map((item, index) => ({
              ...item,
              label: item?.label ? item?.label : `Adresse ${++index}`,
            }))
          : [{ label: `Adresse ${addressCount}`,...leadDetails?.customerDetail?.address }],
      });
    }
  }, [leadDetails?.id]);

  const {
    append,
    fields: addressFields,
    remove,
  } = useFieldArray({ control, name: "address" });

  useMemo(() => {
    if (addressFields.length === 0) return;
    setAddressCount(addressFields.length);
  }, [addressFields.length]);

  const handleFieldTypeChange = (index: number) => {
    const updatedAddressType = [...addressType];
    updatedAddressType[index] = !updatedAddressType[index];
    setAddressType(updatedAddressType);
  };

  const handleBack = () => {
    onHandleNext(ComponentsType.customerAdd);
  };

  const fields = AddLeadAddressDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    addressCount,
    append,
    remove,
    addressFields,
    handleFieldTypeChange,
    addressType,
    setValue
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
