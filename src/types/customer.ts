import { SetStateAction } from "react";
import { FormField, User } from ".";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { OffersTableRowTypes } from "./offers";
import { Plan } from "./admin/plans";
import { Report } from "./appointments";

export interface CustomerTable {
  currentPageRows: Customers[];
}

export interface CustomerDetail {
  date?: string;
  id?: string;
  name?: string;
  handlePreviousClick: () => void;
  handleDelete: () => void;
  customerDetails: Customers;
}
export interface CustomerLeadDetail {
  id: string;
  name: string;
  source?: string;
  status?: string;
  expires?: string;
}
export interface Customers {
  id: string;
  refID: string;
  isAppointment?: boolean;
  createdAt: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  date: string;
  mobileNumber: string;
  gender: number;
  customerType: string;
  companyName: string;
  status?: string;
  editImg?: string;
  editNote?: string;
  mobile: string;
  address: CustomerAddress;
  edit?: boolean;
  lead: CustomerLeadDetail;
  logo: string;
  plan?: Plan;
  createdBy?: User;
}

export interface CustomerAddress {
  streetNumber: string;
  country: string;
  postalCode: string;
  city?: string;
  description?: string;
}

export interface CustomerField {
  customerDetail?: Customers;
}

export interface FormDataProps {
  customerDetail: Customers;
  isUpdate: boolean;
  setIsUpdate: SetStateAction<any>;
  fields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
}
export interface CustomerPromiseActionType {
  type: string;
  payload: any;
  meta: object;
}

export interface OfferPromiseActionType {
  type: string;
  payload: OffersTableRowTypes;
  meta: object;
}
export interface ReportPromiseActionType {
  type: string;
  payload: Report;
  meta: object;
}
