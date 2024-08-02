import { yupResolver } from "@hookform/resolvers/yup";
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
import { ReportContactAddressDetailsValidation } from "@/validation/agent/agentReportSchema";
import {
  contactAgentReportFormField,
  ContactReportAddressFormField,
  ReportContactSubmitFormField,
} from "@/components/agent/appointments/createReport/fields/contact-address-form-fields";
import { useEffect } from "react";
import {
  createReport,
  readReportdetails,
} from "@/api/slices/appointment/appointmentSlice";
import { ReportPromiseActionType } from "@/types/customer";

export interface ReportAddressHookProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const useCreateReportAddressDetails = ({
  onNextHandler,
}: ReportAddressHookProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, loading, appointmentDetails, reportDetails } = useAppSelector(
    (state) => state.appointment
  );

  const { report } = router.query;

  const handleCancel = () => {
    router.push({
      pathname: report
        ? "/agent/appointments/report-detail"
        : "/agent/appointments/details",
      query: {
        appointment: report
          ? reportDetails?.appointmentID?.id
          : appointmentDetails?.id,
        status: "None",
      },
    });
  };

  const schema = ReportContactAddressDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    const transformData = (data: any) => {
      return {
        ...data,
        address: data?.address?.map((item: any) => ({
          ...item,
          lift: item?.lift === true ? "1" : "0",
        })),
      };
    };

    if (report) {
      dispatch(readReportdetails({ params: { filter: report } })).then(
        (response: ReportPromiseActionType) => {
          if (response?.payload) {
            reset(
              transformData({
                fullName: response.payload?.customerDetail?.fullName,
                email: response.payload.customerDetail?.email,
                phoneNumber: response.payload.customerDetail?.phoneNumber,
                address: response.payload?.addressID
                  ? response?.payload?.addressID?.address?.map(
                      (item, index) => ({
                        ...item,
                        label: item?.label ? item?.label : `Adresse ${++index}`,
                      })
                    )
                  : [],
              })
            );
          }
        }
      );
    } else if (reportDetails?.id) {
      reset(
        transformData({
          fullName: reportDetails?.customerDetail?.fullName,
          email: reportDetails.customerDetail?.email,
          phoneNumber: reportDetails.customerDetail?.phoneNumber,
          address: reportDetails?.addressID
            ? reportDetails?.addressID?.address?.map((item, index) => ({
                ...item,
                label: item?.label ? item?.label : `Adresse ${++index}`,
              }))
            : [],
        })
      );
    } else {
      reset(
        transformData({
          fullName: appointmentDetails?.leadID?.customerDetail?.fullName,
          email: appointmentDetails?.leadID?.customerDetail?.email,
          phoneNumber: appointmentDetails?.leadID?.customerDetail?.phoneNumber,
          address: appointmentDetails?.leadID?.addressID
            ? appointmentDetails?.leadID?.addressID?.address?.map(
                (item, index) => ({
                  ...item,
                  label: item?.label ? item?.label : `Adresse ${++index}`,
                })
              )
            : [],
        })
      );
    }
  }, [reportDetails?.id, report]);

  const { fields: addressFields } = useFieldArray({ control, name: "address" });

  const addressFieldsLength = addressFields.length || 1;

  const fields = contactAgentReportFormField(register, false, control);

  const address = ContactReportAddressFormField(
    register,
    loading,
    control,
    addressFieldsLength,
    addressFields
  );

  const submit = ReportContactSubmitFormField(
    register,
    loading,
    control,
    handleCancel
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (report) {
        const apiData = {
          ...data,
          // id: report,
          step: 1,
          appointmentID: reportDetails?.appointmentID?.id,
        };

        const response = await dispatch(
          createReport({
            data: apiData,
            router,
            setError,
            translate,
          })
        );

        if (response?.payload)
          onNextHandler(AppointmentReportsFormStages.HOUSE_DETAILS);
      } else {
        const apiData = {
          ...data,
          step: 1,
          appointmentID: appointmentDetails?.id,
        };

        const response = await dispatch(
          createReport({
            data: apiData,
            router,
            setError,
            translate,
          })
        );

        if (response?.payload)
          onNextHandler(AppointmentReportsFormStages.HOUSE_DETAILS);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return {
    fields: [...fields, ...address, ...submit],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
