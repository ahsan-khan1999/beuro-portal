import { RegisterationFields, PersonalDetailsFields, Salutation, loginAndContactDetailsFields, addressDetailsFields, ResetPasswordFields, ChangePasswordFields } from "@/enums";
import { PersonalDetailsProfile } from "@/enums/userAccount";
import * as yup from 'yup';
export const generateValidation = (translate: Function) => {
    return yup.object().shape({
        [RegisterationFields.email]: yup.string().email().required(translate("validationMessages.required")),
        [RegisterationFields.password]: yup.string().min(6, translate("validationMessages.string.min")).required(translate("validationMessages.required")),
        [RegisterationFields.confirmPassword]: yup.string().oneOf([yup.ref('password')], translate("validationMessages.mixed.oneOf")).required(translate("validationMessages.required")),
    });

}
export const generatePersonalDetailValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [PersonalDetailsFields.salutation]: yup.string().required(translate("validationMessages.required")),
        [PersonalDetailsFields.fullName]: yup.string().required(translate("validationMessages.required")),
        [PersonalDetailsFields.userName]: yup.string().required(translate("validationMessages.required")),
        [PersonalDetailsFields.dateOfBirth]: yup.date().required(translate("validationMessages.required")).typeError(translate("validationMessages.invalid_format")),
    });
}

export const generateLoginAndContactDetailValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [loginAndContactDetailsFields.email]: yup.string().email().required(translate("validationMessages.required")),
        [loginAndContactDetailsFields.phone]: yup.string().required(translate("validationMessages.required")),
        [loginAndContactDetailsFields.otp]: yup.string().notRequired(),
        [loginAndContactDetailsFields.password]: yup.string().notRequired(),
    });
}
export const generateLoginAndContactDetailOAuthValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [loginAndContactDetailsFields.email]: yup.string().email().required(translate("validationMessages.required")),
        [loginAndContactDetailsFields.phone]: yup.string().required(translate("validationMessages.required")),
        [loginAndContactDetailsFields.otp]: yup.string().notRequired(),
        [loginAndContactDetailsFields.password]: yup.string().required(translate("validationMessages.required")),
    });
}

export const generateaddressDetailValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [addressDetailsFields.street]: yup.string().required(translate("validationMessages.required")),
        [addressDetailsFields.houseNo]: yup.string().required(translate("validationMessages.required")),
        [addressDetailsFields.postalCode]: yup.string().matches(/^\d{5}$/, "Postal code should be exactly 5 digits").required(translate("validationMessages.required")),
        [addressDetailsFields.state]: yup.string().required(translate("validationMessages.required")),
        [addressDetailsFields.country]: yup.string().required(translate("validationMessages.required")),
    });
}


export const generateResetPasswordValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [ResetPasswordFields.email]: yup.string().email().required(translate("validationMessages.required")),

    });
}


export const generateChangePasswordValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [ChangePasswordFields.password]: yup.string().required(translate("validationMessages.required")).min(6, translate("validationMessages.string.min")),
        [ChangePasswordFields.confirmPassword]: yup.string().oneOf([yup.ref('password')], translate("validationMessages.mixed.oneOf")).required(translate("validationMessages.required")),


    });
}
export const generateSalutationValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [PersonalDetailsProfile.salutation]: yup.string().required(translate("validationMessages.required")),

    });
}

export const generateDobValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [PersonalDetailsProfile.dob]: yup.string().required(translate("validationMessages.required")),

    });
}

export const generateFullNameValidationSchema = (translate: Function) => {
    return yup.object().shape({
        [PersonalDetailsProfile.fullName]: yup.string().required(translate("validationMessages.required")),

    });
}


export const generateProfileChangePasswordValidationSchema = (translate: Function) => {
    return yup.object().shape({

        [ChangePasswordFields.currentPassword]: yup.string().required(translate("validationMessages.required")).min(6, translate("validationMessages.string.min")),
        [ChangePasswordFields.newPassword]: yup.string().required(translate("validationMessages.required")).min(6, translate("validationMessages.string.min")),
        [ChangePasswordFields.confirmPassword]: yup.string().oneOf([yup.ref('newPassword')], translate("validationMessages.mixed.oneOf")).required(translate("validationMessages.required")),


    });
}