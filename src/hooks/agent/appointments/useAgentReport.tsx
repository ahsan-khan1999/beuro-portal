import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { updateQuery } from "@/utils/update-query";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import {
  getBackReportFormStage,
  getNextReportFormStage,
} from "@/utils/utility";
import {
  ReportAdditionalDetailsValidation,
  ReportContactDetailsValidation,
  ReportHouseDetailsValidation,
} from "@/validation/agent/agentReportSchema";
import { ContactAndAddressReport } from "@/components/agent/appointments/createReport/forms/contact-and-address-form";
import { HouseDetailReport } from "@/components/agent/appointments/createReport/forms/house-detail-form";
import { ServicesDetailReport } from "@/components/agent/appointments/createReport/forms/services-detail-form";
import { AdditionalInfoReport } from "@/components/agent/appointments/createReport/forms/additional-detail-form";
import { generateAddfferServiceDetailsValidation } from "@/validation/offersSchema";

const FORM_COMPONENTS: Record<AppointmentReportsFormStages, React.ElementType> =
  {
    [AppointmentReportsFormStages.CONTACT_AND_ADDRESS]: ContactAndAddressReport,
    [AppointmentReportsFormStages.HOUSE_DETAILS]: HouseDetailReport,
    [AppointmentReportsFormStages.SERVICES]: ServicesDetailReport,
    [AppointmentReportsFormStages.ADDITIONAL_INFO]: AdditionalInfoReport,
  };

export const useAgentReport = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const [currentFormStage, setCurrentFormStage] =
    useState<AppointmentReportsFormStages>(
      AppointmentReportsFormStages.CONTACT_AND_ADDRESS
    );

  const schemas = {
    [AppointmentReportsFormStages.CONTACT_AND_ADDRESS]:
      ReportContactDetailsValidation(translate),
    [AppointmentReportsFormStages.HOUSE_DETAILS]:
      ReportHouseDetailsValidation(translate),
    [AppointmentReportsFormStages.SERVICES]:
      generateAddfferServiceDetailsValidation(translate),
    [AppointmentReportsFormStages.ADDITIONAL_INFO]:
      ReportAdditionalDetailsValidation(translate),
  };

  const formMethodsConfig = {
    [AppointmentReportsFormStages.CONTACT_AND_ADDRESS]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(
        schemas[AppointmentReportsFormStages.CONTACT_AND_ADDRESS]
      ),
    }),
    [AppointmentReportsFormStages.HOUSE_DETAILS]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(
        schemas[AppointmentReportsFormStages.HOUSE_DETAILS]
      ),
    }),
    [AppointmentReportsFormStages.SERVICES]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(
        schemas[AppointmentReportsFormStages.SERVICES]
      ),
    }),
    [AppointmentReportsFormStages.ADDITIONAL_INFO]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(
        schemas[AppointmentReportsFormStages.ADDITIONAL_INFO]
      ),
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
