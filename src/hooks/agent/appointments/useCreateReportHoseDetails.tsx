import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ReportHouseDetailsValidation } from "@/validation/agent/agentReportSchema";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { houseDetailReportFormField } from "@/components/agent/appointments/createReport/fields/house-detail-form-fields";

export interface ReportHouseDetailsProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onBackHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const useCreateReportHoseDetails = ({
  onNextHandler,
  onBackHandler,
}: ReportHouseDetailsProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const schema = ReportHouseDetailsValidation(translate);
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

  const fields = houseDetailReportFormField(
    register,
    loading,
    control,
    onBackHandler
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
    if (response?.payload) onNextHandler(AppointmentReportsFormStages.SERVICES);
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
