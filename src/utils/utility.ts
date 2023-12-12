import {
  updateProfileStep1,
  updateProfileStep2,
  updateProfileStep3,
} from "@/api/slices/authSlice/auth";
import {
  AddressType,
  ApiResponseType,
  CheckProps,
  DateRangeProps,
  DivProps,
  Errors,
  FieldProps,
  FieldType,
  FormField,
} from "@/types";
import { Action, AsyncThunkAction } from "@reduxjs/toolkit";
import { NextRouter } from "next/router";
import { updateQuery } from "./update-query";
import { DEFAULT_SERVICE, staticEnums } from "./static";
import { DetailScreensStages } from "@/enums/auth";
import moment from "moment";
import { CustomerAddress } from "@/types/customer";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { Service } from "@/types/service";
import { EmailStatus, OfferStatus, PaymentType } from "@/types/offers";
import { formatDateString } from "./functions";
import { useCallback, useRef, useState } from "react";

export const getNextFormStage = (
  current: DetailScreensStages
): DetailScreensStages | null => {
  const stages = Object.values(DetailScreensStages);
  const currentIndex = stages.indexOf(current);
  if (currentIndex !== -1 && currentIndex < stages.length - 1) {
    return stages[currentIndex + 1];
  }
  return null;
};
export const getBackFormStage = (
  current: DetailScreensStages
): DetailScreensStages | null => {
  const stages = Object.values(DetailScreensStages);
  const currentIndex = stages.indexOf(current);
  if (currentIndex !== -1 && currentIndex > 0) {
    return stages[currentIndex - 1];
  }
  return null;
};

export function isFieldType(type: any): type is FieldType {
  return ["input", "password", "select", "phone", "span", "button"].includes(
    type
  );
}
const mapServerValidationToFieldArray = (serverValidation) => {
  const fieldArrayErrors = {};

  Object.entries(serverValidation).forEach(([key, value]) => {
    const [fieldName, fieldError] = key.split(".");

    if (!fieldArrayErrors[fieldName]) {
      fieldArrayErrors[fieldName] = [];
    }

    fieldArrayErrors[fieldName].push({
      [fieldName]: fieldError,
    });
  });

  return fieldArrayErrors;
};
export function formatStrings(str: string, replaceValues: string[]): string {
  let formattedString = str;
  for (const [index, value] of replaceValues.entries()) {
    formattedString = formattedString.replace(`{${index}}`, value);
  }
  return formattedString;
}
export function setErrors(
  setError: Function,
  errors: object,
  translate: Function
): void {
  if (!errors) return;
  let newObj = {};
  for (const [key, value] of Object.entries(errors)) {
    if (key && !value) setError(key, { message: null });
    if (Array.isArray(value)) {
      value.forEach((element, index) => {
        for (let [key1, value1] of Object.entries(element)) {
          const newKey = key1.split(".")[1];
          newObj = {
            ...newObj,
            [index]: {
              [newKey]: { message: translate(`validationMessages.${value1}`) },
            },
          };
        }
      });
      setError(key, newObj);
    } else
      setError(key, {
        message: formatStrings(
          translate(`validationMessages.${value?.split(":")[0]}`),
          value?.split(":").slice(1)
        ),
      });
  }
}
export function setErrorMessage(
  error: string | null,
  translate: Function
): string {
  if (!error) return "";
  return translate(`validationMessages.${error}`);
}

export function returnStep(
  data: object,
  router: NextRouter,
  setError: Function,
  translate: Function,
  currentFormStage: string,
  nextFormHandler: Function
): AsyncThunkAction<any, any, any> | any {
  if (currentFormStage === DetailScreensStages.CompanyDetails)
    return updateProfileStep1({
      data,
      router,
      setError,
      translate,
      currentFormStage,
      nextFormHandler,
    });
  if (currentFormStage === DetailScreensStages.LocationDetails)
    return updateProfileStep2({
      data,
      router,
      setError,
      translate,
      currentFormStage,
      nextFormHandler,
    });
  if (currentFormStage === DetailScreensStages.BankDetails)
    return updateProfileStep3({
      data,
      router,
      setError,
      translate,
      currentFormStage,
      nextFormHandler,
    });
  return updateProfileStep1({
    data,
    router,
    setError,
    translate,
    currentFormStage,
    nextFormHandler,
  });
}

export const combineClasses = (
  defaultClasses: string,
  className?: string
): string => {
  if (!className) return defaultClasses;

  const defaultSet = new Set(defaultClasses.split(" "));
  const customSet = new Set(className.split(" "));

  // Remove classes with !! prefix from default classes
  [...customSet].forEach((customClass) => {
    if (customClass.startsWith("!!")) {
      defaultSet.delete(customClass.slice(2));
      customSet.delete(customClass);
    }
  });

  // Remove overlapping classes from default classes
  [...defaultSet].forEach((defaultClass) => {
    const baseClass = defaultClass.split("-")[0];
    [...customSet].forEach((customClass) => {
      if (customClass.startsWith(baseClass)) {
        defaultSet.delete(defaultClass);
      }
    });
  });

  return [...defaultSet, ...customSet].join(" ");
};

export const toggler = ({ condition, truthy, falsy }: CheckProps): string => {
  return condition ? truthy : falsy;
};

export const conditionHandlerRegistration = (
  router: NextRouter,
  response: ApiResponseType,
  connect?: boolean
) => {
  if (!connect) {
    if (!response.data.data.User.isEmailVerified) {
      router.pathname = "/register-success";
      updateQuery(router, "en");
    } else if (!response.data.data.User.isProfileComplete) {
      router.pathname = "/profile";
      updateQuery(router, "en");
    } else {
      router.pathname = "/dashboard";
      updateQuery(router, "en");
    }
  } else {
    router.query = {};
    updateQuery(router, "en");
  }
};
export const conditionHandlerLogin = (
  router: NextRouter,
  response: ApiResponseType,
  connect?: boolean
) => {
  if (!connect) {
    if (!response.data.data.User.isEmailVerified) {
      router.pathname = "/login-success";
      updateQuery(router, "en");
    } else if (!response.data.data.User.isProfileComplete) {
      router.pathname = "/profile";
      updateQuery(router, "en");
    } else {
      router.pathname = "/dashboard";
      updateQuery(router, "en");
    }
  } else {
    router.query = {};
    updateQuery(router, "en");
  }
};

export const formatAddress = (address: CustomerAddress | undefined) => {
  if (!address) return "";
  return `${address?.streetNumber},  ${address?.country},  ${address?.postalCode}`;
};

export const validateUserRole = (
  userRoleString: string,
  role: number[]
): boolean => {
  const roleMapping: { [key: string]: number } = {
    Admin: staticEnums.User.role.Admin,
    Company: staticEnums.User.role.Company,
    Employee: staticEnums.User.role.Employee,
  };

  if (roleMapping.hasOwnProperty(userRoleString)) {
    const userRole: number = roleMapping[userRoleString];
    return role.includes(userRole);
  }

  return false;
};

export const checkToggle = (data: object, key: string): boolean => {
  if (!data) return false;
  return Object.values(data)?.every((item: any) => item[key] === true);
};

export const getButtonClass = (
  condition: boolean,
  activeClass: string,
  inactiveClass: string = ""
) => {
  return condition ? activeClass : inactiveClass;
};

export const findErrorMessage = (
  errors: Errors,
  data: string[],
  fieldName: string
) => {
  const keys = data.length > 0 ? data : [fieldName];

  let currentError = errors;

  for (const key of keys) {
    if (currentError && currentError.hasOwnProperty(key)) {
      currentError = currentError[key];
    } else {
      return undefined;
    }
  }

  return currentError?.message;
};

export const senitizePhone = (data: string) => {
  if (!data?.toString().includes("+")) return "+" + data;
  else return data;
};

export function getDaysDifference(targetDate: string) {
  const targetDateTime = moment(targetDate);
  const currentDate = moment();

  const daysDifference = targetDateTime.diff(currentDate, "days");

  return Math.abs(daysDifference);
}

export function senitizeDataForm(inputObject: Record<string, any>) {
  const outputArray = [];
  for (let i = 1; i <= Object.keys(inputObject).length / 4; i++) {
    const addressObj = {
      streetNumber: inputObject[`streetNumber-${i}`] || "",
      postalCode: inputObject[`postalCode-${i}`] || "",
      country: inputObject[`country-${i}`] || "",
      description: inputObject[`description-${i}`] || "",
    };
    outputArray.push(addressObj);
  }

  return outputArray;
}

export function formatDate(date: string) {
  return moment(date).format("DD/MM/YYYY hh:mm:ss");
}
export function formatDateReverse(date: string) {
  return moment(date).format("hh:mm:ss, DD/MM/YYYY");
}
export function formatDateTimeToDate(date: string) {
  return moment(date).format("YYYY-MM-DD");
}

export function getStatusColor(status: string) {
  if (staticEnums["LeadStatus"][status] == staticEnums["LeadStatus"]["Close"])
    return "#FE9244";
  else if (
    staticEnums["LeadStatus"][status] == staticEnums["LeadStatus"]["Open"]
  )
    return "#FE9244";
  else if (
    staticEnums["LeadStatus"][status] == staticEnums["LeadStatus"]["Expired"]
  )
    return "#FF376F";
  else return "#FF376F";
}

type TransformedMessages = {
  [key: string]: any;
};
export function transformValidationMessages(
  messages: any
): TransformedMessages {
  let obj: object = {};
  if (Array.isArray(messages)) {
    for (let i = 0; i < messages?.length; i++) {
      for (const [key, value] of Object.entries(messages[i])) {
        let splitKey = key?.split(".")[1];
        obj = { ...obj, [splitKey + "-" + (i + 1)]: value };
      }
    }
  }
  return obj;
}

export function transformAddressFormValues(address: any): TransformedMessages {
  let obj: object = {};
  if (Array.isArray(address)) {
    for (let i = 0; i < address?.length; i++) {
      for (const [key, value] of Object.entries(address[i])) {
        obj = { ...obj, [key + "-" + (i + 1)]: value };
      }
    }
  }
  return obj;
}

type InputStructure = {
  [key: string]: string;
};

type OutputStructure = {
  startDate: string;
  endDate: string;
  [key: string]: string; // Index signature
};

export const transformDateFormValues = (
  input: InputStructure
): OutputStructure[] => {
  const result: OutputStructure[] = [];
  Object.keys(input).forEach((key) => {
    const match = key.match(/(startDate|endDate)_(\d+)/);
    if (match) {
      const index = parseInt(match[2], 10);
      const dateType = match[1];
      if (!result[index]) {
        result[index] = { startDate: "", endDate: "" };
      }
      result[index][dateType] = input[key];
    }
  });

  return result;
};
export const transformFieldsToValues = (
  obj: Record<string, object>,
  fields: string[]
) => {
  const result = fields.map((field) => obj[field]);
  return result;
};

export function setImageFieldValues(
  setValue: UseFormSetValue<FieldValues>,
  images: string[]
) {
  if (images.length === 0) return;
  images.forEach((element, idx) => {
    setValue(`upload_image${idx + 1}`, element);
  });
}
// export function setDateFieldValues(setValue: UseFormSetValue<FieldValues>, date: DateRangeProps[]) {
//   if (!date || date.length === 0) return;

//   date.forEach((element, idx) => {
//     // Use the correct array syntax for field names
//     setValue(`date${[idx]}.startDate_${idx}`, formatDateString(element?.startDate));
//     setValue(`date${[idx]}.endDate_${idx}`, formatDateString(element?.endDate));
//   });
// }
export function setAddressFieldValues(
  setValue: UseFormSetValue<FieldValues>,
  images: string[]
) {
  if (images.length === 0) return;
  images.forEach((element, idx) => {
    console.log(element, "element", idx);

    setValue(`offerContent.address_${idx}`, element);
  });
}
export const generateAddressFields = (count: number) => {
  const addressFields = [];
  for (let i = 0; i < count; i++) {
    addressFields.push(`address_${i}`);
  }
  return addressFields;
};
export const filterLead = (
  id: string | string[],
  service: Service[]
): Service | Service[] => {
  let checkedService: Service | Service[] = DEFAULT_SERVICE;
  if (Array.isArray(id)) {
    checkedService = id.map(
      (item) => service.find((item_) => item_.id === item) || DEFAULT_SERVICE
    );
  } else {
    checkedService = service.find((item) => item.id === id) || DEFAULT_SERVICE;
  }
  return checkedService;
};

export const transformAttachments = (attachmemts: string[]) => {
  if (attachmemts?.length === 0) return;

  const list = attachmemts?.map((item) => ({
    value: item,
    name: getFileNameFromUrl(item),
  }));
  return list;
};

export function getFileNameFromUrl(url: string) {
  const urlParts = url.split("/");
  const fileName = urlParts[urlParts.length - 1];
  return fileName;
}

export function getEmailColor(status: string) {
  if (staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Draft"])
    return "#FE9244";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Send"]
  )
    return "#4A13E7";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Failed"]
  )
    return "#FF0000";
  else return "#FF376F";
}

export function getPaymentTypeColor(status: string) {
  if (staticEnums["PaymentType"][status] == staticEnums["PaymentType"]["Cash"])
    return "#45C769";
  else if (
    staticEnums["PaymentType"][status] == staticEnums["PaymentType"]["Online"]
  )
    return "#FF376F";
  else return "#FF376F";
}
export function getOfferStatusColor(status: string) {
  if (staticEnums["OfferStatus"][status] == staticEnums["OfferStatus"]["Open"])
    return "#4A13E7";
  else if (
    staticEnums["OfferStatus"][status] == staticEnums["OfferStatus"]["Signed"]
  )
    return "#45C769";
  else if (
    staticEnums["OfferStatus"][status] == staticEnums["OfferStatus"]["Expired"]
  )
    return "#FF376F";
  else if (
    staticEnums["OfferStatus"][status] == staticEnums["OfferStatus"]["Rejected"]
  )
    return "#FF0000";
  else return "#FF376F";
}

export function getContractStatusColor(status: string) {
  if (
    staticEnums["ContractStatus"][status] ==
    staticEnums["ContractStatus"]["Open"]
  )
    return "#4A13E7";
  else if (
    staticEnums["ContractStatus"][status] ==
    staticEnums["ContractStatus"]["Confirmed"]
  )
    return "#45C769";
  else if (
    staticEnums["ContractStatus"][status] ==
    staticEnums["ContractStatus"]["Cancelled"]
  )
    return "#FF0000";
  else return "#FF376F";
}
export function getInvoiceStatusColor(status: string) {
  if (
    staticEnums["InvoiceStatus"][status] ==
    staticEnums["InvoiceStatus"]["Pending"]
  )
    return "#FE9244";
  else if (
    staticEnums["InvoiceStatus"][status] ==
    staticEnums["InvoiceStatus"]["Overdue"]
  )
    return "#FF0000";
  else if (
    staticEnums["InvoiceStatus"][status] == staticEnums["InvoiceStatus"]["Paid"]
  )
    return "#45C769";
  else return "#FF376F";
}

export function getInvoiceEmailColor(status: string) {
  if (staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Draft"])
    return "#FF376F";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Send"]
  )
    return "#4A13E7";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Failed"]
  )
    return "#FE9244";
  else return "#FF376F";
}

export function calculateTax(amount: number, taxPercentage: number) {
  const taxAmount = (amount * (taxPercentage / 100)).toFixed(2);
  return parseFloat(taxAmount);
}

export const filterService = (id: string, service: Service[]): string => {
  if (service?.length === 0 && !id) return "";
  const filteredService = service.find((item) => item.id === id);
  return filteredService?.serviceName || "";
};

export const useClipboardCopy = <
  T extends HTMLElement = HTMLInputElement
>() => {
  const inputRef = useRef<T | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = useCallback(async () => {
    if (inputRef.current) {
      let textToCopy: string = "";
      if (inputRef.current instanceof HTMLInputElement) {
        textToCopy = inputRef.current.value;
      } else {
        textToCopy = inputRef.current.textContent || "";
      }

      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
      } catch (err) {
        setIsCopied(false);
      }
    }
  }, []);

  return { inputRef, handleCopy, isCopied };
};

export const calculateDiscount = (
  amount: number,
  discount: number,
  isPercent: boolean
) => {
  if (isPercent) {
    const effectiveDiscountPercentage = Math.min(discount, 100);
    return (effectiveDiscountPercentage / 100) * amount;
  } else {
    return Math.min(discount, amount);
  }
};
