import { ApiResponse, Header } from "@/enums/auth";
import { ModalType } from "@/enums/ui";
import { FilterType } from ".";
import { StaticImageData } from "next/image";

export interface GlobalState {
  loading: boolean;
  file: object | null;
  modal: {
    type: ModalType.NONE;
    cardId?: number;
    data?: any;
  };
  currentLanguage: string;
  locationSearch: null;
  advertLocation: string;
  filter: {
    location: string;
  };
  map: boolean;
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
  send?: boolean;
  draft?: boolean;
  failed: boolean;
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
  value: string;
  onChange?: (val: string, checked: boolean) => void;
  containerClassName?: string;
  isMobile?: boolean;
}

export interface InputFieldProps {
  value?: string;
  handleChange: (value: string) => void;
  onEnterPress?: () => void;
  containerClassName?: string;
  inputDivClassName?: string;
  textClassName?: string;
  placeholder?: string;
  bgColor?: boolean;
  iconDisplay?: boolean;
  options?: {
    icon: StaticImageData;
    id: string;
    userName: string;
    service: string;
  }[];
}

export interface OptionsFieldProps {
  value?: string;
  title?: string;
  label?: string;
  border?: number;
  handleChange: (value?: string, isAgent?: boolean) => void;
  options: { label: string; value?: string }[];
  dropDownIconClassName?: string;
  containerClassName?: string;
  dropdownClassName?: string;
  isSearch?: boolean;
  labelClassName?: string;
}
export interface BooleanOptionsFieldProps {
  value?: boolean;
  title?: string;
  label?: string;
  border?: number;
  handleChange: (value?: boolean, isAgent?: boolean) => void;
  options: { label: string; value?: boolean }[];
  dropDownIconClassName?: string;
  containerClassName?: string;
  dropdownClassName?: string;
  isSearch?: boolean;
  labelClassName?: string;
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
export interface onRejectProps {
  onClose: () => void;
  onReject?: () => void;
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

export interface ShareImagesProps {
  onClose: () => void;
  id: string;
  type: string;
}
