import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import {
  houseDetailReportFormField,
  roomsObject,
} from "@/components/agent/appointments/createReport/fields/house-detail-form-fields";
import {
  readReportDetails,
  updateReport,
} from "@/api/slices/appointment/appointmentSlice";
import { useEffect, useState } from "react";
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

  const [roomType, setRoomType] = useState<number | null>(null);

  // const schema = ReportHouseDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<FieldValues>({
    // resolver: yupResolver<FieldValues>(schema),
  });

  const {
    append,
    fields: roomsFields,
    remove,
  } = useFieldArray({ control, name: "rooms" });

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

  const addressFieldsLength = roomsFields?.length || 0;

  const handleChangeLabel = (value: string, index: number) => {
    setValue(`rooms.${index}.title`, value);
  };
  const onDeleteRoom = (index: number) => {
    // setValue(`rooms.${index}.title`, value);
    remove(index);
    const data = getValues();
    reset({
      ...data,
    });
  };

  const handleAddNewRoom = () => {
    append(roomsObject);
  };

  const onEditTitle = (idx: number | null) => {
    setRoomType(idx);
  };

  const fields = houseDetailReportFormField(
    register,
    loading,
    control,
    onBackHandler,
    handleAddNewRoom,
    addressFieldsLength,
    roomType,
    handleChangeLabel,
    watch()?.rooms || [],
    onEditTitle,
    onDeleteRoom
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
              return [key, convertValues(value, excludeKeys)];
            } else if (excludeKeys.includes(key)) {
              return [key, value];
            } else if (value === "") {
              return [key, value];
            } else {
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
