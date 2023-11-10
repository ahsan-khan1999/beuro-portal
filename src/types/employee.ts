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
  name: string;
  email: string;
  phone: number;
  designation: string;
  createdOn: Date | null;
  action: "edit";
}
export interface EmployeeDetail {
  date?: Date | null;
  id?: string;
  name?: string;
  isUpdate: boolean;
}

export interface FormDataProps {
  employeeDetail: Employee;
  isUpdate: boolean;
  handlePasswordReset:Function
  setIsUpdate: SetStateAction<any>;
  fields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
}
