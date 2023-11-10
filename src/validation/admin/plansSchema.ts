import { PlanDetailFields } from "@/enums/admin/plans";
import * as yup from "yup";

export const generatePlansValidation = (translate: Function) => {
  return yup.object().shape({
    [PlanDetailFields.name]: yup.string().required("validation required"),
    [PlanDetailFields.priceMonthly]: yup
      .string()
      .required("validation required"),
    [PlanDetailFields.anuallDiscount]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PlanDetailFields.employeeNo]: yup
      .number()
      .required(translate("validationMessages.required")),

    [PlanDetailFields.requestNo]: yup
      .number()
      .required(translate("validationMessages.required")),
    [PlanDetailFields.description]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PlanDetailFields.accountingReports]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PlanDetailFields.customEmails]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PlanDetailFields.waterMark]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PlanDetailFields.apifeature]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
