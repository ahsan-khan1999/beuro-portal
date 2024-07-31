import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { houseDetailReportFormField } from "@/components/agent/appointments/createReport/fields/house-detail-form-fields";
import { updateReport } from "@/api/slices/appointment/appointmentSlice";

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

  const fields = houseDetailReportFormField(
    register,
    loading,
    control,
    onBackHandler
  );

  // useMemo(() => {
  //   if (appointmentDetails.id) {
  //     reset({
  //       ...appointmentDetails,
  //     });
  //   }
  // }, [appointmentDetails.id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const houseItemValue = Object.entries(data).map(([key, value]) => {
      const convertedValue = isNaN(Number(value)) ? value : Number(value);
      return [key, convertedValue];
    });

    const apiData = {
      ...houseItemValue,
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
