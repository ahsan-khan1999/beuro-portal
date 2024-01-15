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
import { senitizeDataForm, transformAddressFormValues } from "@/utils/utility";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useMemo, useState } from "react";

export const useAddLeadAddressDetails = (
  onHandleBack: (currentComponent: ComponentsType) => void,
  onHandleNext: (currentComponent: ComponentsType) => void
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { customerDetails } = useAppSelector((state) => state.customer);
  const [addressType, setAddressType] = useState([false, false])

  const [addressCount, setAddressCount] = useState(
    leadDetails?.addressID?.address?.length || 1
  );
  const schema = generateLeadsAddressEditDetailsValidation(
    translate,
    addressCount
  );


  const handleRemoveNewAddress = () => {
    setAddressCount(addressCount - 1);

  };
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isValid },
    getValues,
    setValue
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });
  
  const handleAddNewAddress = () => {
    setAddressCount(addressCount + 1);
    setValue(`label-${addressCount + 1}`, `Address ${addressCount + 1}`)
  };
  useMemo(() => {
    if (leadDetails.id) {
      reset(
        transformAddressFormValues(
          leadDetails?.addressID?.address
            ? leadDetails?.addressID?.address
            : [{...leadDetails?.customerDetail?.address,label:"Address 1"}]
        )
      );
    } else {
      reset(
        transformAddressFormValues(
          [{
            label: "Address 1",
            country: "Switerland",
            postalCode: "",
            streetNumber: ""
          }]
        )
      );
    }
  }, [leadDetails.id]);

  const handleFieldTypeChange = (index: number) => {
    let address = [...addressType];
    address[index - 1] = !address[index - 1]
    console.log(address, "address");

    setAddressType(address)
  }
  const fields = AddLeadAddressDetailsFormField(
    register,
    loading,
    control,
    onHandleBack,
    addressCount,
    handleAddNewAddress,
    handleRemoveNewAddress,
    [],
    handleFieldTypeChange,
    addressType
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      address: senitizeDataForm(data).slice(0, addressCount),
      step: 2,
      id: leadDetails?.id,
      stage: ComponentsType.serviceAdd,
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
