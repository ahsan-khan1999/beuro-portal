import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddLeadServiceDetailsFormField } from "@/components/leads/fields/Add-lead-service-details";
import { generateLeadsServiceEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { readService } from "@/api/slices/service/serviceSlice";
import { useEffect, useMemo } from "react";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { formatDate, formatDateTimeToDate } from "@/utils/utility";

export const useAddLeadServiceDetails = ({ onHandleBack, onHandleNext }: { onHandleBack: (currentComponent: ComponentsType) => void, onHandleNext: (currentComponent: ComponentsType) => void }) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { service } = useAppSelector((state) => state.service);


  const schema = generateLeadsServiceEditDetailsValidation(translate);
  useEffect(() => {
    dispatch(readService({ params: { filter: { paginate: 0 } } }))
  }, [])

  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useMemo(() => {
    if (leadDetails.id) {
      console.log(formatDateTimeToDate(leadDetails?.desireDate),"le");
      
      reset({
        ...leadDetails,
        desireDate:formatDateTimeToDate(leadDetails?.desireDate)
      })
    }
  }, [leadDetails.id])
  const fields = AddLeadServiceDetailsFormField(register, loading, control, onHandleBack, trigger, service,leadDetails
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 3, id: leadDetails?.id, stage: ComponentsType.additionalEdit }
    const response = await dispatch(updateLead({ data: apiData, router, setError, translate }));
    if (response?.payload) onHandleNext(ComponentsType.additionalEdit);

    // dispatch(loginUser({ data, router, setError, translate }));
    // onHandleNext(ComponentsType.additionalEdit);
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate
  };
};
