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
import { useEffect, useState } from "react";
import {
  createReport,
  readAppointmentDetails,
  readReportDetails,
} from "@/api/slices/appointment/appointmentSlice";
import { ReportPromiseActionType } from "@/types/customer";
import { CustomerPromiseActionType } from "@/types/company";

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
  const { report, companyAppointment, appointmentId } = router.query;

  const handleCancel = () => {
    const pathname = companyAppointment
      ? "/appointments/details"
      : report
      ? "/agent/appointments/report-detail"
      : "/agent/appointments/details";

    const query: any = {
      appointment: report
        ? reportDetails?.appointmentID?.id
        : appointmentDetails?.id,
      status: "None",
    };

    if (companyAppointment) {
      query.companyAppointment = companyAppointment;
    }

    router.push({
      pathname,
      query,
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

  const { fields: addressFields } = useFieldArray({ control, name: "address" });

  useEffect(() => {
    const transformData = (data: any) => {
      return {
        ...data,
        address: data?.address?.map((item: any) => ({
          ...item,
          lift: item?.lift === true ? "1" : "0",
          parkingPermit: item?.parkingPermit === "true" ? true : false,
        })),
      };
    };

    const resetFormWithAddresses = (addresses: any[], labelPrefix: string) => {
      return addresses.map((item, index) => ({
        ...item,
        label: item?.label || `${labelPrefix} ${++index}`,
      }));
    };

    if (report) {
      dispatch(readReportDetails({ params: { filter: report } })).then(
        (response: ReportPromiseActionType) => {
          if (response?.payload) {
            const transformedData = transformData({
              fullName: response.payload?.customerDetail?.fullName,
              email: response.payload.customerDetail?.email,
              phoneNumber: response.payload.customerDetail?.phoneNumber,
              address: resetFormWithAddresses(
                response.payload?.addressID?.address || [],
                "Adresse"
              ),
            });

            reset(transformedData);
          }
        }
      );
    } else if (reportDetails?.id) {
      const transformedData = transformData({
        fullName: reportDetails?.customerDetail?.fullName,
        email: reportDetails.customerDetail?.email,
        phoneNumber: reportDetails.customerDetail?.phoneNumber,
        address: resetFormWithAddresses(
          reportDetails?.addressID?.address || [],
          "Adresse"
        ),
      });

      reset(transformedData);
    } else if (appointmentId) {
      dispatch(
        readAppointmentDetails({
          params: { filter: appointmentId },
        })
      ).then((response: CustomerPromiseActionType) => {
        if (response.payload) {
          const transformedData = transformData({
            fullName: response.payload?.leadID?.customerDetail?.fullName,
            email: response.payload?.leadID?.customerDetail?.email,
            phoneNumber: response.payload?.leadID?.customerDetail?.phoneNumber,
            address: resetFormWithAddresses(
              response.payload?.leadID?.addressID?.address || [],
              "Adresse"
            ),
          });

          reset(transformedData);
        }
      });
      // const transformedData = transformData({
      //   fullName: appointmentDetails?.leadID?.customerDetail?.fullName,
      //   email: appointmentDetails?.leadID?.customerDetail?.email,
      //   phoneNumber: appointmentDetails?.leadID?.customerDetail?.phoneNumber,
      //   address: resetFormWithAddresses(
      //     appointmentDetails?.leadID?.addressID?.address || [],
      //     "Adresse"
      //   ),
      // });

      // reset(transformedData);
    }
  }, [appointmentDetails?.id, reportDetails?.id, report, appointmentId]);

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
