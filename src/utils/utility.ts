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
  FilterType,
  FormField,
  User,
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
import { FiltersDefaultValues } from "@/enums/static";
import { PDFDocument } from "pdf-lib";
import 'moment/locale/de';
import { TFunction } from "next-i18next";
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
export const areFiltersEmpty = (filter: FilterType) => {
  return Object.values(filter).every((value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else if (value === undefined) {
      return true;
    }
    return value === "";
  });
};

//filtering filter

// export const cleanFilter = (filterObj: FilterType): FilterType => {
//   // Define cleanedFilter with the same type as FilterType
//   const cleanedFilter: Partial<FilterType> = {};

//   for (const key in filterObj) {
//     const value = filterObj[key as keyof FilterType];

//     // Check for non-empty strings and arrays
//     if ((typeof value === 'string' && value !== '') ||
//         (Array.isArray(value) && value.length > 0)) {
//       cleanedFilter[key as keyof FilterType] = value;
//     }

//     // Check for the date object with non-default and non-empty dates
//     if (key === 'date' && typeof value === 'object' && value !== null) {
//       const { $gte, $lte } = value;
//       const dateFilter: FilterType['date'] = {};

//       if ($gte && $gte !== '01/01/2000') dateFilter.$gte = $gte;
//       if ($lte && $lte !== '01/01/5000') dateFilter.$lte = $lte;

//       // If both $gte and $lte are empty or default, remove the date key
//       if (Object.keys(dateFilter).length !== 0) {
//         cleanedFilter.date = dateFilter;
//       }
//     }
//   }
//   return cleanedFilter as FilterType;
// };

export const formatDateForDatePicker = (isoDateString: string) => {
  if (
    isoDateString === FiltersDefaultValues.$gte ||
    isoDateString === FiltersDefaultValues.$lte
  )
    return "";
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
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
    } else {
      setError(key, {
        message: formatStrings(
          translate(`validationMessages.${value?.split(":")[0]}`),
          value?.split(":").slice(1)
        ),
      });
    }
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
      updateQuery(router, router?.locale as string);
    } else if (!response.data.data.User.isProfileComplete) {
      router.pathname = "/profile";
      updateQuery(router, router?.locale as string);
    } else if (
      staticEnums["User"]["role"][response?.data?.data?.User?.role] === 1 &&
      !response?.data?.data?.User?.plan?.id
    ) {
      router.pathname = "/plan";
      updateQuery(router, router?.locale as string);
    } else {
      if (staticEnums["User"]["role"][response?.data?.data?.User?.role] === 0) {
        router.pathname = "/admin/dashboard";
      } else {
        router.pathname = "/dashboard";
      }
      updateQuery(router, router?.locale as string);
    }
  } else {
    router.query = {};
    updateQuery(router, "en");
  }
};

export const conditionHandlerProfile = (
  router: NextRouter,
  response: User,
  connect?: boolean
) => {
  if (!connect) {
    if (!response?.isEmailVerified) {
      router.pathname = "/login-success";
      updateQuery(router, "en");
    } else if (!response?.isProfileComplete) {
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
      label: inputObject[`label-${i}`] || "",
    };
    outputArray.push(addressObj);
  }

  return outputArray;
}

export function formatDate(date: string) {
  return moment(date).format("DD/MM/YYYY HH:MM");
}
export function formatDateReverse(date: string) {
  if (!date) return;
  return moment(date).format("HH:MM, DD/MM/YYYY");
}
export function formatDateTimeToDate(date: string) {
  if (!date) return null;
  return moment(date).format("DD-MM-YYYY");
}

export function pdfDateFormat(date: string, locale: string) {
  if (!date) return null;
  return moment(date).locale(locale).format("DD. MMMM YYYY");
}

export function formatDateTimeToDateMango(date: string) {
  if (!date) return null;
  return moment(date).format("YYYY-MM-DD");
}
export function formatDateTimeToTime(date: string) {
  return moment(date).format("HH:mm");
}

export function getStatusColor(status: string) {
  if (staticEnums["LeadStatus"][status] == staticEnums["LeadStatus"]["Open"])
    return "#4A13E7";
  else if (
    staticEnums["LeadStatus"][status] == staticEnums["LeadStatus"]["Close"]
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
  if (images?.length === 0) return;
  images?.forEach((element, idx) => {
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
  if (images?.length === 0) return;
  images.forEach((element, idx) => {
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
  let checkedService: any = DEFAULT_SERVICE;
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

export function getFileNameFromUrl(url: string, count?: number) {

  const urlParts = url?.split("/");
  const fileName = urlParts[urlParts?.length - 1];
  return fileName?.slice(0, count ? count : 28);
}


export function getEmailColor(status: string) {
  if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Pending"]
  )
    return "#FF0000";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Sent"]
  )
    return "#FE9244";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Post"]
  )
    return "#4A13E7";
  else return "#FF376F";
}

export function getPaymentTypeColor(status: string) {
  if (staticEnums["PaymentType"][status] == staticEnums["PaymentType"]["Cash"])
    return "#45C769";
  else if (
    staticEnums["PaymentType"][status] == staticEnums["PaymentType"]["Online"]
  )
    return "#FE9244";
  else return "#FF376F";
}

export function getOfferStatusColor(status: string) {
  if (staticEnums["OfferStatus"][status] == staticEnums["OfferStatus"]["Open"])
    return "#4A13E7";
  else if (
    staticEnums["OfferStatus"][status] == staticEnums["OfferStatus"]["Accepted"]
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
  else return "#4A13E7";
}

export function getInvoiceEmailColor(status: string) {
  if (staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Post"])
    return "#FF376F";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Sent"]
  )
    return "#4A13E7";
  else if (
    staticEnums["EmailStatus"][status] == staticEnums["EmailStatus"]["Pending"]
  )
    return "#FF0000";
  else return "#FF376F";
}

export function getMailStatusColor(status: string) {
  if (staticEnums["mailStatus"][status] == staticEnums["mailStatus"]["failed"])
    return "#FF376F";
  else if (
    staticEnums["mailStatus"][status] == staticEnums["mailStatus"]["pending"]
  )
    return "#FE9244";
  else return "#45C769";
}

export function calculateTax(amount: number, taxPercentage: number) {
  const taxAmount = (amount * (taxPercentage / 100)).toFixed(2);
  return parseFloat(taxAmount);
}
export function calculatePercentage(
  amount: number,
  totalAmount: number
): number {
  if (totalAmount === 0) {
    return 0; // Avoid division by zero
  }
  const percentage = ((amount / totalAmount) * 100).toFixed(2);
  return parseFloat(percentage);
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
export function dataURLtoBlob(dataURL: any) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

// export const smoothScrollToSection = (target: string) => {
//   const element = document.querySelector(target);

//   if (!element) {
//     console.error(`Element with selector ${target} not found`);
//     return;
//   }

//   const headerOffset = 100; // Adjust this value according to your page layout
//   const elementPosition = element.getBoundingClientRect().top + window.scrollY;
//   const offsetPosition = elementPosition - headerOffset;

//   window.scrollTo(0,offsetPosition);
// };

export const getValueForKeyInArray = (key: string, array?: any) => {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].hasOwnProperty(key)) {
        return array[i][key];
      }
    }
  } else return null;
};

export const smoothScrollToSection = (target: string) => {
  const element = document.getElementById(target);
  const headerOffset = 100;
  const elementPosition = element?.getBoundingClientRect().top || 0;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollBy({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export function blobToFile(blob: any, fileName: string) {
  const options = { type: blob.type };
  const file = new File([blob], fileName, options);
  return file;
}

export const mergePDFs = async (pdfBlobs: Blob[], fileName?: string) => {
  const mergedPdf = await PDFDocument.create();

  for (const blob of pdfBlobs) {
    const arrayBuffer =
      blob instanceof ArrayBuffer ? blob : await blob.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(
      pdfDoc,
      pdfDoc.getPageIndices()
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  mergedPdf.setTitle(fileName || "PDF File");

  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};

export const replaceClassesWithInlineStyles = (htmlContent: string): string => {
  const classToStyleMap: { [className: string]: string } = {
    "text-tiny": "font-size: 8px;",
    "text-small": "font-size: 10px",
    "text-big": "font-size: 19.6px",
    "text-huge": "font-size: 24px;",
    "ck-link_selected": "background-color: rgba(31,176,255,.1)",
    "ck-list-bogus-paragraph": "display: block;",
  };

  return htmlContent.replace(/class="([^"]*)"/g, (match, classNames) => {
    const classes: string[] = classNames.split(/\s+/);
    const styleRules = classes
      .map((className: string) => classToStyleMap[className] || "")
      .join(" ");
    return styleRules ? `style="${styleRules}"` : "";
  });
};


export function validateUrl(url: string, translate: TFunction) {
  const regexp = new RegExp('((http|https)\\://)?[a-zA-Z0-9\\./\\?\\:@\\-_=#]+\\.([a-zA-Z]){2,6}([a-zA-Z0-9\\.\\&/\\?\\:@\\-_=#])*')
  if (!regexp.test(url)) {
    return { isValid: false, message: translate("validationMessages.invalid_format") };
  }
  return { isValid: true, message: '' };
}

export const getCurrentMonth = () => {
  const currentDate = new Date();
  return currentDate.getMonth() + 1;
};

export const downloadFile = (url:string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = getFileNameFromUrl(url);
      link.click();
      URL.revokeObjectURL(blobUrl); 
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
};