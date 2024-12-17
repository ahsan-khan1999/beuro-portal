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
import { houseDetailReportFormField } from "@/components/agent/appointments/createReport/fields/house-detail-form-fields";
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
  } = useFieldArray({ control, name: "generalRoomDetails" });

  const { report } = router.query;

  useEffect(() => {
    if (report) {
      dispatch(readReportDetails({ params: { filter: report } })).then(
        (response: ReportPromiseActionType) => {
          if (response?.payload) {
            reset({
              livingRoomDetails: response?.payload?.livingRoomDetails,
              generalRoomDetails: response?.payload?.generalRoomDetails,
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
        generalRoomDetails: reportDetails?.generalRoomDetails,
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
    setValue(`generalRoomDetails.${index}.mainHeading`, value);
  };
  const onDeleteRoom = (index: number) => {
    remove(index);
    const data = getValues();
    reset({ ...data });
  };

  const handleAddNewRoom = () => {
    append({
      mainHeading: "Living Room",
      descriptions: "",
      label1: "Sofa",
      label1Value: "",
      label2: "Teacher Desk",
      label2Value: "",
      label3: "TV Table",
      label3Value: "",
      label4: "Arm Chair",
      label4Value: "",
      label5: "Table",
      label5Value: "",
      label6: "Shelf",
      label6Value: "",
      label7: "L Sofa",
      label7Value: "",
      label8: "TV",
      label8Value: "",
      label9: "Deco Big",
      label9Value: "",
      label10: "Box",
      label10Value: "",
    });
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
    watch()?.generalRoomDetails || [],
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
          Object.entries(obj)
            .filter(([key, value]) => {
              if (
                key === "generalRoomDetails" &&
                Array.isArray(value) &&
                value.length === 0
              ) {
                return false;
              }
              return true;
            })
            .map(([key, value]) => {
              if (key === "generalRoomDetails" && Array.isArray(value)) {
                const processedArray = value.map((item) =>
                  typeof item === "object" && item !== null
                    ? convertValues(item, excludeKeys)
                    : item
                );
                return [key, processedArray];
              } else if (typeof value === "object" && value !== null) {
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
