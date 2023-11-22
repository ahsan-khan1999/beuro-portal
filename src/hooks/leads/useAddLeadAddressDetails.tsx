import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddLeadAddressDetailsFormField } from "@/components/leads/fields/Add-lead-address-fields";
import { generateLeadsAddressEditDetailsValidation } from "@/validation/leadsSchema";
import { senitizeDataForm } from "@/utils/utility";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";

export const useAddLeadAddressDetails = (onHandleBack: (currentComponent: ComponentsType) => void, onHandleNext: (currentComponent: ComponentsType) => void) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const schema = generateLeadsAddressEditDetailsValidation(translate, 2);


  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),

  });


  const fields = AddLeadAddressDetailsFormField(register, loading, control, onHandleBack, 2)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { address: senitizeDataForm(data), step: 2, id: leadDetails?.id }
    const response = await dispatch(updateLead({ data: apiData, router, setError, translate }));
    if (response?.payload) onHandleNext(ComponentsType.serviceEdit);
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};




