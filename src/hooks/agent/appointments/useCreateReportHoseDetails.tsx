import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { houseDetailReportFormField } from "@/components/agent/appointments/createReport/fields/house-detail-form-fields";
import {
  readReportDetails,
  updateReport,
} from "@/api/slices/appointment/appointmentSlice";
import { useEffect } from "react";
import { ReportPromiseActionType } from "@/types/customer";

export interface ReportHouseDetailsProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onBackHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

type DataType = {
  [key: string]: any;
};

export const useCreateReportHoseDetails = ({
  onNextHandler,
  onBackHandler,
}: ReportHouseDetailsProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, appointmentDetails, reportDetails } = useAppSelector(
    (state) => state.appointment
  );

  // const schema = ReportHouseDetailsValidation(translate);
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

  const { report } = router.query;

  useEffect(() => {
    if (report) {
      dispatch(readReportDetails({ params: { filter: report } })).then(
        (response: ReportPromiseActionType) => {
          if (response?.payload) {
            reset({
              livingRoomDetails: response?.payload?.livingRoomDetails,
              kitchenDetails: response?.payload?.kitchenDetails,
              bedRoomDetails: response?.payload?.bedRoomDetails,
              roomDetails: response?.payload?.roomDetails,
              outDoorDetails: response?.payload?.outDoorDetails,
              basementAtticDetails: response?.payload?.basementAtticDetails,
              specialItemsDetails: response?.payload?.specialItemsDetails,
            });
          }
        }
      );
    } else {
      reset({
        livingRoomDetails: reportDetails?.livingRoomDetails,
        kitchenDetails: reportDetails?.kitchenDetails,
        bedRoomDetails: reportDetails?.bedRoomDetails,
        roomDetails: reportDetails?.roomDetails,
        outDoorDetails: reportDetails?.outDoorDetails,
        basementAtticDetails: reportDetails?.basementAtticDetails,
        specialItemsDetails: reportDetails?.specialItemsDetails,
      });
    }
  }, [reportDetails?.id, report]);

  const fields = houseDetailReportFormField(
    register,
    loading,
    control,
    onBackHandler
  );

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
            } else if (value === "") {
              // Preserve empty strings
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

      const excludeKeys = ["descriptions"];
      const convertedApiData = convertValues(data, excludeKeys);

      if (report) {
        const apiData = {
          ...convertedApiData,
          step: 2,
          id: reportDetails?.id,
          appointmentID: reportDetails?.appointmentID?.id,
        };

        const response = await dispatch(
          updateReport({ data: apiData, router, setError, translate })
        );

        if (response?.payload) {
          onNextHandler(AppointmentReportsFormStages.SERVICES);
        }
      } else {
        const apiData = {
          ...convertedApiData,
          step: 2,
          id: reportDetails?.id,
          appointmentID: appointmentDetails?.id,
        };

        const response = await dispatch(
          updateReport({ data: apiData, router, setError, translate })
        );

        if (response?.payload) {
          onNextHandler(AppointmentReportsFormStages.SERVICES);
        }
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
