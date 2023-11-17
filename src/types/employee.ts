import { SetStateAction } from "react";
import { FormField } from ".";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

// Interface for the Employee table
export interface Employee {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  mobileNumber: string;
  designation: string;
  creationDate: string;
  action: string;
  createdBy: string;
  employeeID: string
}
export interface EmployeeDetail {
  date?: string;
  id?: string;
  name?: string;
  isUpdate: boolean;
  handleDelete: () => void
}

export interface FormDataProps {
  employeeDetail?: Employee;
  isUpdate: boolean;
  handlePasswordReset: Function
  setIsUpdate: SetStateAction<any>;
  fields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
}
