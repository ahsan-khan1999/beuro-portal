import { ContactAndAddressReport } from "@/components/agent/appointments/createReport/forms/contact-and-address-form";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { updateQuery } from "@/utils/update-query";
import {
  getBackReportFormStage,
  getNextReportFormStage,
} from "@/utils/utility";
import {
  ReportAdditionalDetailsValidation,
  ReportContactDetailsValidation,
  ReportHouseDetailsValidation,
  ReportServiceDetailsValidation,
} from "@/validation/agent/agentReportSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const FORM_COMPONENTS = {
  [AppointmentReportsFormStages.CONTACT_AND_ADDRESS]: ContactAndAddressReport,
  [AppointmentReportsFormStages.HOUSE_DETAILS]: <></>,
  [AppointmentReportsFormStages.SERVICES]: <></>,
  [AppointmentReportsFormStages.ADDITIONAL_INFO]: <></>,
};

export const useAgentReport = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const [currentFormStage, setCurrentFormStage] =
    useState<AppointmentReportsFormStages>(
      AppointmentReportsFormStages.CONTACT_AND_ADDRESS
    );

  const contactAndAddressSchema = ReportContactDetailsValidation(translate);
  const houseDetailSchema = ReportHouseDetailsValidation(translate);
  const servicesDetailSchema = ReportServiceDetailsValidation(translate);
  const additionalDetailSchema = ReportAdditionalDetailsValidation(translate);

  const formMethodsConfig = {
    [AppointmentReportsFormStages.CONTACT_AND_ADDRESS]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(contactAndAddressSchema),
    }),
    [AppointmentReportsFormStages.HOUSE_DETAILS]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(houseDetailSchema),
    }),
    [AppointmentReportsFormStages.SERVICES]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(servicesDetailSchema),
    }),
    [AppointmentReportsFormStages.ADDITIONAL_INFO]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(additionalDetailSchema),
    }),
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    trigger,
    reset,
    formState: { errors },
  } = formMethodsConfig[currentFormStage];

  const CurrentFormComponent = FORM_COMPONENTS[currentFormStage];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handleBackStage = getBackReportFormStage(currentFormStage);
  const handleNextStage = getNextReportFormStage(currentFormStage);

  const nextFormHandler = () => {
    const nextStage = getNextReportFormStage(currentFormStage);

    if (nextStage) {
      setCurrentFormStage(nextStage);
    } else {
      router.pathname = "/agent/appointments/details";
      updateQuery(router, "en");
    }
  };

  return {
    translate,
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    trigger,
    errors,
    onSubmit,
    CurrentFormComponent,
    currentFormStage,
    setCurrentFormStage,
    nextFormHandler,
    handleBackStage,
    handleNextStage,
  };
};
