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
import { generateLeadsAddressEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { useEffect, useMemo, useState } from "react";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { LeadsEditAddressDetailsFormField } from "@/components/leads/fields/Leads-address-details-fields";
import { readAddressSettings } from "@/api/slices/settingSlice/settings";

export const useLeadsAddressEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addressType, setAddressType] = useState([false, false]);
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const [addressCount, setAddressCount] = useState(
    leadDetails?.addressID?.address?.length || 1
  );

  const { addressSettings } = useAppSelector((state) => state.settings);

  const handleBack = () => {
    onClick(1, ComponentsType.address);
  };

  const schema = generateLeadsAddressEditDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    dispatch(readAddressSettings());
    if (leadDetails?.id) {
      reset({
        address: leadDetails?.addressID
          ? leadDetails?.addressID?.address?.map((item, index) => ({
              ...item,
              label: item?.label ? item?.label : `Adresse ${++index}`,
            }))
          : [
              {
                label: `Adresse ${addressCount}`,
                ...leadDetails?.customerDetail?.address,
              },
            ],
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
  }, [addressFields]);

  const handleFieldTypeChange = (index: number) => {
    const updatedAddressType = [...addressType];
    updatedAddressType[index] = !updatedAddressType[index];
    setAddressType(updatedAddressType);
  };

  const handleChangeLabel = (item: string, index: number) => {
    setValue(`address.${index}.label`, item);
  };

  const fields = LeadsEditAddressDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    addressCount,
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
      id: leadDetails?.id,
      stage: ComponentsType.serviceEdit,
    };
    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onClick(1, ComponentsType.address);
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
