import { SetStateAction } from "react";
import { FormField } from "..";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface Plan {
  planName:string;
  monthlyPrice:number;
  discount:number;
  numberOfEmployees:number;
  numberOfRequests:number;
  accountingReport:boolean;
  customizedEmail:boolean;
  watermark:boolean;
  apiFeatures:boolean;
  description:string;
  id:string;
  refID:string;
  yearlyPrice:number;
  createdAt:string
}
export interface FormDataProps {
  planDetail: Plan | null;
  isUpdate: boolean;
  setIsUpdate: SetStateAction<any>;
  fields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
}
