import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  detailBankValidation,
  detailLocationValidation,
  detailScreensValidation,
} from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBackFormStage, getNextFormStage, returnStep } from "@/utils/utility";
import { updateQuery } from "@/utils/update-query";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { DetailScreensStages } from "@/enums/auth";
import Company from "@/components/loginAndRegister/detailScreens/Company";
import Bank from "@/components/loginAndRegister/detailScreens/Bank";
import Location from "@/components/loginAndRegister/detailScreens/Location";

const FORM_COMPONENTS = {
  [DetailScreensStages.CompanyDetails]: Company,
  [DetailScreensStages.LocationDetails]: Location,
  [DetailScreensStages.BankDetails]: Bank,
};
export default function useDetail() {
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [progress, setProgress] = useState(20);
  const [currentFormStage, setCurrentFormStage] = useState<DetailScreensStages>(
    DetailScreensStages.CompanyDetails
  );

  const router = useRouter();
  const companyDetailsSchema = detailScreensValidation(translate);
  const locationDetailSchema = detailLocationValidation(translate);
  const bankDetailSchema = detailBankValidation(translate);

  const formMethodsConfig = {
    [DetailScreensStages.CompanyDetails]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(companyDetailsSchema),
    }),
    [DetailScreensStages.LocationDetails]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(locationDetailSchema),
    }),
    [DetailScreensStages.BankDetails]: useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(bankDetailSchema),
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
    
    
    formState: { errors },
  } = formMethodsConfig[currentFormStage];

  const CurrentFormComponent = FORM_COMPONENTS[currentFormStage];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(
      returnStep(
        data,
        router,
        setError,
        translate,
        currentFormStage,
        nextFormHandler
      )
    );
    // nextFormHandler();
  };
  const backStage = getBackFormStage(currentFormStage);
   const nextStage = getNextFormStage(currentFormStage);

   const nextFormHandler = () => {
    const nextStage = getNextFormStage(currentFormStage);

    if (nextStage) {
      setProgress((prev) => prev + 40);
      setCurrentFormStage(nextStage);
    }
     else {
      router.pathname = "/dashboard";
      updateQuery(router, "en");
    }
  };
  return {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    trigger,
    errors,
    onSubmit,
    nextFormHandler,
    CurrentFormComponent,
    currentFormStage,
    progress,
    backStage,
    nextStage,
    setCurrentFormStage,
  };
}
