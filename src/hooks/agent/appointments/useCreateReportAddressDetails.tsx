import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { ReportContactAddressDetailsValidation } from "@/validation/agent/agentReportSchema";
import {
  contactAgentReportFormField,
  ContactReportAddressFormField,
  ReportContactSubmitFormField,
} from "@/components/agent/appointments/createReport/fields/contact-address-form-fields";
import { useEffect, useState } from "react";

export interface ReportAddressHookProps {
  onNextHandle: (currentComponent: AppointmentReportsFormStages) => void;
}

export const useCreateReportAddressDetails = ({
  onNextHandle,
}: ReportAddressHookProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, leadDetails } = useAppSelector((state) => state.lead);
  const { loading, appointmentDetails } = useAppSelector(
    (state) => state.appointment
  );

  const [addressType, setAddressType] = useState(
    appointmentDetails?.addressID
      ? Array.from(appointmentDetails?.addressID?.address, () => false)
      : appointmentDetails?.addressID?.address
      ? Array.from(appointmentDetails?.addressID?.address, () => false)
      : [false] || [false]
  );

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
      address: appointmentDetails?.addressID
        ? leadDetails?.addressID?.address?.map((item, index) => ({
            ...item,
            label: item?.label && item?.label,
          }))
        : addressType?.map((item, index) => ({
            streetNumber: "",
            postalCode: "",
            floor: 0,
            room: 0,
            lift: false,
            parkingPermit: false,
            label: `Adresse ${++index}`,
          })),
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

  const addressesFields = ContactReportAddressFormField(
    register,
    loading,
    control,
    addressFieldsLength,
    addressFields
  );

  const submit = ReportContactSubmitFormField(register, false, control, () =>
    console.log()
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 1,
      id: appointmentDetails?.id,
      stage: AppointmentReportsFormStages.CONTACT_AND_ADDRESS,
    };

    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );

    if (response?.payload)
      onNextHandle(AppointmentReportsFormStages.HOUSE_DETAILS);
  };

  return {
    fields: [...fields, ...addressesFields, ...submit],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
