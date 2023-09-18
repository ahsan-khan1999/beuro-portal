import { AddressDetails } from "@/components/loginAndRegister/register/registerationProgressDetails/address-details";
import { LoginAndContactDetails } from "@/components/loginAndRegister/register/registerationProgressDetails/login-and-contact-details";
import { FormStages } from "@/enums";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import { generateLoginAndContactDetailOAuthValidationSchema, generateLoginAndContactDetailValidationSchema, generatePersonalDetailValidationSchema, generateaddressDetailValidationSchema } from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getNextFormStage, returnStep } from "@/utils/utility";
import { updateQuery } from "@/utils/update-query";
import { PersonalDetails } from "@/components/loginAndRegister/register/registerationProgressDetails/personal-details";
import { useAppDispatch, useAppSelector } from "../useRedux";

const FORM_COMPONENTS = {
    [FormStages.PersonalDetails]: PersonalDetails,
    [FormStages.LoginAndContacts]: LoginAndContactDetails,
    [FormStages.AddressDetails]: AddressDetails,
};
export default function useProfileDetailsPane() {
    const { t: translate } = useTranslation()
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()


    const [progress, setProgress] = useState(20);
    const [currentFormStage, setCurrentFormStage] = useState<FormStages>(
        FormStages.PersonalDetails
    );


    const router = useRouter();
    const personalDetailsSchema = generatePersonalDetailValidationSchema(translate)
    const loginAndContactDetailSchema = user?._isSocialLogin ? generateLoginAndContactDetailOAuthValidationSchema(translate) : generateLoginAndContactDetailValidationSchema(translate)
    const generateaddressDetailSchema = generateaddressDetailValidationSchema(translate)

    const formMethodsConfig = {
        [FormStages.PersonalDetails]: useForm<FieldValues>({
            resolver: yupResolver(personalDetailsSchema),
        }),
        [FormStages.LoginAndContacts]: useForm<FieldValues>({
            resolver: yupResolver(loginAndContactDetailSchema),
        }),
        [FormStages.AddressDetails]: useForm<FieldValues>({
            resolver: yupResolver(generateaddressDetailSchema),
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


    console.log(errors);
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        
        dispatch(returnStep(data, router, setError, translate, currentFormStage, nextFormHandler))

    };

    const nextFormHandler = () => {
        const nextStage = getNextFormStage(currentFormStage);

        if (nextStage) {
            setProgress((prev) => prev + 40)
            setCurrentFormStage(nextStage);
        } else {
            router.pathname = "registrationSuccess";
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
        progress
    }
}
