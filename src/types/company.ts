import { SetStateAction } from "react";
import { FormField } from ".";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { OffersTableRowTypes } from "./offers";

export interface CompanyTable {
  currentPageRows: Company[];
}

export interface CompanyDetail {
  date?: string;
  id?: string;
  name?: string;
  handlePreviousClick: () => void;
  handleDelete: () => void
}
export interface CompanyLeadDetail {
  id: string;
  name: string;
  source?: string;
  status?: string;
  expires?: string;
}
export interface Company {
  id: string;
  refID: string;
  createdAt: string
  fullName: string;
  email: string;
  phoneNumber: string;
  date: string;
  mobileNumber: string;

  status?: string;
  editImg?: string;
  editNote?: string;
  customerType: string;
  companyName: string;
  mobile: string;
  address: CustomerAddress;
  edit?: boolean;
  lead: CompanyLeadDetail;
}

export interface CustomerAddress {
  streetNumber: string;
  country: string;
  postalCode: string
}


export interface CustomerField {
  customerDetail?: Company;
}

export interface FormDataProps {
  customerDetail: Company;
  isUpdate: boolean;
  setIsUpdate: SetStateAction<any>;
  fields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
}
export interface CustomerPromiseActionType {
  type: string,
  payload: any,
  meta: object,
}

export interface OfferPromiseActionType {
  type: string,
  payload: OffersTableRowTypes,
  meta: object,
}