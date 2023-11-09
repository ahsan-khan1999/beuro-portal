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
  service: string;
  unit?: string;
  createdBy?: string;
  createdOn: Date | null;
  price: {
    value: number;
    currency: string;
  };
  description: string;
  action: "edit";
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
