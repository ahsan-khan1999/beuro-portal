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
import { createReport } from "@/api/slices/appointment/appointmentSlice";

export interface ReportAddressHookProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const useCreateReportAddressDetails = ({
  onNextHandler,
}: ReportAddressHookProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, loading, appointmentDetails } = useAppSelector(
    (state) => state.appointment
  );

  const handleCancel = () => {
    router.push({
      pathname: "/agent/appointments/details",
      query: {
        appointment: appointmentDetails?.id,
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
    defaultValues: {
      address: appointmentDetails?.leadID?.addressID
        ? appointmentDetails?.leadID?.addressID?.address?.map(
            (item, index) => ({
              ...item,
              label: item?.label ? item?.label : `Adresse ${++index}`,
            })
          )
        : [],
    },
  });

  useEffect(() => {
    if (appointmentDetails?.id) {
      reset({
        fullName: appointmentDetails?.leadID?.customerDetail?.fullName,
        email: appointmentDetails?.leadID?.customerDetail?.email,
        phoneNumber: appointmentDetails?.leadID?.customerDetail?.phoneNumber,
      });
    }
  }, [appointmentDetails?.id]);

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
    const apiData = {
      ...data,
      mode: `${1}`,
      appointmentID: appointmentDetails?.id,
    };

    try {
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
