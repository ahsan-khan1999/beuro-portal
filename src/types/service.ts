import { SetStateAction } from "react";
import { FormField, User } from ".";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface Service {
  id: string;
  serviceName: string;
  unit: number;
  createdBy?: User;
  price: number;
  description: string;
  createdAt: string;
  refID: string;
  discount: number;
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
