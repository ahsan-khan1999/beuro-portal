import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { additionalAgentReportFormField } from "@/components/agent/appointments/createReport/fields/additional-info-form-fields";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { updateReport } from "@/api/slices/appointment/appointmentSlice";
import { useEffect } from "react";

export interface ReportAdditionalDetailsProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onHandleBack: (currentComponent: AppointmentReportsFormStages) => void;
}

type DataType = {
  [key: string]: any;
};

export const useCreateReportAdditionalDetails = ({
  onNextHandler,
  onHandleBack,
}: ReportAdditionalDetailsProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, appointmentDetails, reportDetails } = useAppSelector(
    (state) => state.appointment
  );

  // const schema = ReportAdditionalDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    // resolver: yupResolver<FieldValues>(schema),
  });

  const fields = additionalAgentReportFormField(
    register,
    loading,
    control,
    onHandleBack
  );

  useEffect(() => {
    if (reportDetails?.id) {
      reset({
        offerDetails: reportDetails?.offerDetails,
      });
    }
  }, [reportDetails?.id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const convertValues = (
      obj: DataType,
      excludeKeys: string[] = []
    ): DataType => {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            // Recursively convert nested objects
            return [key, convertValues(value, excludeKeys)];
          } else if (excludeKeys.includes(key)) {
            // Exclude specific keys from conversion
            return [key, value];
          } else {
            // Convert value to number if it's numeric
            const convertedValue = isNaN(Number(value)) ? value : Number(value);
            return [key, convertedValue];
          }
        })
      );
    };

    const excludeKeys = ["noteAndInformation", "remarks"];
    const convertedApiData = convertValues(data, excludeKeys);

    const apiData = {
      ...convertedApiData,
      step: 4,
      id: reportDetails?.id,
      appointmentID: appointmentDetails?.id,
    };

    const response = await dispatch(
      updateReport({ data: apiData, router, setError, translate })
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
