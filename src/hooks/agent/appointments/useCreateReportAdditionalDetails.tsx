import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ReportAdditionalDetailsValidation } from "@/validation/agent/agentReportSchema";
import { additionalAgentReportFormField } from "@/components/agent/appointments/createReport/fields/additional-info-form-fields";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";

export interface ReportAdditionalDetailsProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onHandleBack: (currentComponent: AppointmentReportsFormStages) => void;
}

export const useCreateReportAdditionalDetails = ({
  onNextHandler,
  onHandleBack,
}: ReportAdditionalDetailsProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const schema = ReportAdditionalDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = additionalAgentReportFormField(
    register,
    loading,
    control,
    onHandleBack
  );

  useMemo(() => {
    if (leadDetails.id) {
      reset({
        ...leadDetails,
      });
    }
  }, [leadDetails.id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 4,
      id: leadDetails?.id,
      stage: ComponentsType.additionalEdit,
    };
    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );
    if (response?.payload)
      onNextHandler(AppointmentReportsFormStages.ADDITIONAL_INFO);
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
