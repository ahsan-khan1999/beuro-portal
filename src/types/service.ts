import { SetStateAction } from "react";
import { FormField } from ".";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

// Interface for the services table
export interface Service {
  id: string;
  serviceName: string;
  unit: number;
  createdBy?: string;
  createdOn: string;
  price: number
  description: string;
}

export interface FormDataProps {
  serviceDetail: Service;
  isUpdate: boolean;
  setIsUpdate: SetStateAction<any>;
  fields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
}
