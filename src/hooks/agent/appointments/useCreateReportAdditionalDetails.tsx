import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { additionalAgentReportFormField } from "@/components/agent/appointments/createReport/fields/additional-info-form-fields";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import {
  readReportDetails,
  updateReport,
} from "@/api/slices/appointment/appointmentSlice";
import { useEffect } from "react";
import { ReportPromiseActionType } from "@/types/customer";

export interface ReportAdditionalDetailsProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onHandleBack: (currentComponent: AppointmentReportsFormStages) => void;
  onReportCreated: () => void;
  onReportUpdate: () => void;
}

type DataType = {
  [key: string]: any;
};

export const useCreateReportAdditionalDetails = ({
  onNextHandler,
  onHandleBack,
  onReportCreated,
  onReportUpdate,
}: ReportAdditionalDetailsProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, appointmentDetails, reportDetails } = useAppSelector(
    (state) => state.appointment
  );

  const { report } = router.query;

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
    if (report) {
      dispatch(readReportDetails({ params: { filter: report } })).then(
        (response: ReportPromiseActionType) => {
          if (response?.payload) {
            reset({
              offerDetails: response?.payload?.offerDetails,
            });
          }
        }
      );
    } else {
      reset({
        offerDetails: reportDetails?.offerDetails,
      });
    }
  }, [report]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
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
              const convertedValue = isNaN(Number(value))
                ? value
                : Number(value);
              return [key, convertedValue];
            }
          })
        );
      };

      const excludeKeys = ["noteAndInformation", "remarks"];
      const convertedApiData = convertValues(data, excludeKeys);
      if (report) {
        const apiData = {
          ...convertedApiData,
          step: 4,
          id: reportDetails?.id,
          appointmentID: reportDetails?.appointmentID?.id,
        };

        const response = await dispatch(
          updateReport({ data: apiData, router, setError, translate })
        );

        if (response?.payload) onReportUpdate();
      } else {
        const apiData = {
          ...convertedApiData,
          step: 4,
          id: reportDetails?.id,
          appointmentID: appointmentDetails?.id,
        };

        const response = await dispatch(
          updateReport({ data: apiData, router, setError, translate })
        );

        if (response?.payload) onReportCreated();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
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
