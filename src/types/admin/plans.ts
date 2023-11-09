import { SetStateAction } from "react";
import { FormField } from "..";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface PlansAdmin {
  id: number;
  planName: string;
  description: string;
  price: string;
  employs: number;
  anuallyDiscount: string;
  requestsNo: number;
  accountingReports: string;
  customizeEmails: string;
  waterMark: string;
  apiFeature: string;
}
export interface FormDataProps {
  planDetail: PlansAdmin;
  isUpdate: boolean;
  setIsUpdate: SetStateAction<any>;
  fields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
}
