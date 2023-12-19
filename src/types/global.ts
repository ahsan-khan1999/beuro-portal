import { ApiResponse, Header } from "@/enums/auth";
import { ModalType } from "@/enums/ui";
import { Dispatch, SetStateAction } from "react";
import { FilterType } from ".";

export interface GlobalState {
  loading: boolean;
  file: object | null;
  modal: {
    type: ModalType.NONE;
    cardId?: number;
    data?: any;
  };
}

export type TranslatorFunction = (value: any) => any;
export interface Status {
  open?: boolean;
  close?: boolean;
  expire?: boolean;
  signed?: boolean;
  rejected?: boolean;
  confirmed?: boolean;
  cancelled?: boolean;
  overdue?: boolean;
  paid?: boolean;
  active?: boolean;
  blocked?: boolean;
}
export interface CheckBoxFilterProps {
  label: string;
  type: keyof Status;
}
export interface CheckFieldProps {
  label: string;
  checkboxFilter: FilterType;
  setCheckBoxFilter: React.Dispatch<React.SetStateAction<any>>;
  type: keyof FilterType;
  defaultChecked?: string;
  value?: string;
}
export interface InputFieldProps {
  value: string;
  handleChange: (value: string) => void;
  containerClassName?: string;
  textClassName?: string;
  bgColor?: boolean;
  iconDisplay?: boolean;
}

export interface OptionsFieldProps {
  value: string;
  title?: string;
  label?: string;
  border?: number;
  handleChange: (value: string) => void;
  options: string[];
  dropDownIconClassName: string;
  containerClassName?: string;
}

export interface GlobalApiResponseType {
  [Header.header]: {
    [Header.accesstoken]: string;
    [Header.refreshtoken]: string;
  };
  [Header.data]: {
    [ApiResponse.success]: boolean;
    [ApiResponse.code]: number;
    [ApiResponse.message]: string;
    [Header.data]: Record<string, any>;
  };
}
export interface CreateSuccessProps {
  onClose: () => void;
  modelHeading: string;
  modelSubHeading: string;
  routeHandler: () => void;
}
export interface UpdateSuccessProps {
  onClose: () => void;
  modelHeading: string;
  modelSubHeading: string;
  cancelHandler: () => void;
  confirmHandler: () => void;
  loading: boolean;
}

export interface Attachement {
  name: string;
  value: string;
}

export interface DocumentHeaderDetailsProps {
  offerNo: string;
  offerDate: string;
  createdBy: string;
}

export interface ServiceItemFooterProps {
  subTotal: string;
  tax: string;
  discount: string;
  grandTotal: string;
}

export interface ContactDetailsProps {
  address: {
    name: string;
    streetWithNumber: string;
    postalCode: string;
    city: string;
  };
  email: string;
  phone: string;
}
export interface MovingDetailsProps {
  header: string;
  address1: string;
  address1Details: string;
  address2: string;
  address2Details: string;
  workDates: string;
}
export interface ServiceItemProps {
  title: string;
  description: string;
  price: string;
  count: string;
  total: string;
}

export interface DocumentDetailFooterProps {
  companyName: string;
  companyDomain: string;
  infoMail: string;
  firstNumber: string;
  secondNumber: string;
  postFinance: string;
  streeAdress: string;
  streetNumber: string;
  lastNumber: string;
}

export interface PdfPreviewProps {
  headerDetails: DocumentHeaderDetailsProps;
  contactAddress: ContactDetailsProps;
  movingDetails: MovingDetailsProps;
  serviceItem: ServiceItemProps[];
  serviceItemFooter: ServiceItemFooterProps;
  footerDetails: DocumentDetailFooterProps;
}
