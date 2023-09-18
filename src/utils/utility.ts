import { updateProfileStep1, updateProfileStep2, updateProfileStep3 } from "@/api/slices/authSlice/auth";
import { FormStages } from "@/enums/form";
import { AddressType, ApiResponseType, CheckProps, FieldType } from "@/types";
import { Action, AsyncThunkAction } from "@reduxjs/toolkit";
import { NextRouter } from "next/router";
import { updateQuery } from "./update-query";
import { staticEnums } from "./static";
// import { FormStages } from "@/enums";

//get next form
export const getNextFormStage = (current: FormStages): FormStages | null => {
  const stages = Object.values(FormStages);
  const currentIndex = stages.indexOf(current);
  if (currentIndex !== -1 && currentIndex < stages.length - 1) {
    return stages[currentIndex + 1];
  }
  return null;
}


export function isFieldType(type: any): type is FieldType {
  return ['input', 'password', 'select', 'phone', 'span', 'button'].includes(type);
}


export function formatStrings(str: string, replaceValues: string[]): string {
  let formattedString = str;
  for (const [index, value] of replaceValues.entries()) {
    formattedString = formattedString.replace(`{${index}}`, value);
  }
  return formattedString;
}
export function setErrors(setError: Function, errors: object, translate: Function): void {
  if (!errors) return
  for (const [key, value] of Object.entries(errors)) {
    if (key && !value) setError(key, { message: null })
    else setError(key, { message: formatStrings(translate(`validationMessages.${value?.split(":")[0]}`), value?.split(":").slice(1)) })
  }
}
export function setErrorMessage(error: string | null, translate: Function): string {
  if (!error) return "";
  return translate(`validationMessages.${error}`)
}

export function returnStep(data: object, router: NextRouter, setError: Function, translate: Function, currentFormStage: string, nextFormHandler: Function): AsyncThunkAction<any, any, any> | any {
  if (currentFormStage === FormStages.PersonalDetails) return updateProfileStep1({ data, router, setError, translate, currentFormStage, nextFormHandler })
  if (currentFormStage === FormStages.LoginAndContacts) return updateProfileStep2({ data, router, setError, translate, currentFormStage, nextFormHandler })
  if (currentFormStage === FormStages.AddressDetails) return updateProfileStep3({ data, router, setError, translate, currentFormStage, nextFormHandler })
  return updateProfileStep1({ data, router, setError, translate, currentFormStage, nextFormHandler });
}

export const combineClasses = (defaultClasses: string, className?: string): string => {
  if (!className) return defaultClasses;

  const defaultSet = new Set(defaultClasses.split(' '));
  const customSet = new Set(className.split(' '));

  // Remove classes with !! prefix from default classes
  [...customSet].forEach(customClass => {
    if (customClass.startsWith('!!')) {
      defaultSet.delete(customClass.slice(2));
      customSet.delete(customClass);
    }
  });

  // Remove overlapping classes from default classes
  [...defaultSet].forEach(defaultClass => {
    const baseClass = defaultClass.split('-')[0];
    [...customSet].forEach(customClass => {
      if (customClass.startsWith(baseClass)) {
        defaultSet.delete(defaultClass);
      }
    });
  });

  return [...defaultSet, ...customSet].join(' ');
}


export const toggler = ({ condition, truthy, falsy }: CheckProps): string => {
  return condition ? truthy : falsy;
}


export const conditionHandler = (router: NextRouter, response: ApiResponseType, connect?: boolean) => {
  if (!connect) {
    if (!response.data.data.User.isEmailVerified) {
      router.pathname = "/register/verifyEmailAddress";
      updateQuery(router, "en");
    } else if (!response.data.data.User.isProfileComplete) {
      router.pathname = "/register/profiledetails";
      updateQuery(router, "en");
    } else {
      router.pathname = "/user-account-settings";
      updateQuery(router, "en");
    }
  } else {
    router.query = {}
    updateQuery(router, "en");
  }
}

export const formatAddress = (address: AddressType | undefined) => {
  if (!address?.streetAddress) return null
  return `${address?.houseNumber},  ${address?.streetAddress},  ${address?.postCode}, ${address?.state}, ${address?.country}`
}

export const validateUserRole = (userRoleString: string, role: number[]): boolean => {
  const roleMapping: { [key: string]: number } = {
    "Admin": staticEnums.User.role.Admin,
    "Private": staticEnums.User.role.Private,
    "Commercial": staticEnums.User.role.Commercial,
  };

  if (roleMapping.hasOwnProperty(userRoleString)) {
    const userRole: number = roleMapping[userRoleString];
    return role.includes(userRole);
  }

  return false;
}

export const checkToggle = (data: object, key: string): boolean => {
  if (!data) return false;
  return Object.values(data)?.every((item: any) => item[key] === true)
}

// Italy
// Germany
// Switzerland
// Austria
// France