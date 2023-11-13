import { svgs } from "./../base-components/SideBar";
import {
  Component,
  ReactNode,
  SetStateAction,
  Dispatch as stateDispatch,
} from "react";
import { FormField } from "./form";
import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { User } from "./auth";
import { ButtonClickFunction, CountryType, Image, countryType } from "./ui";
import { NextRouter } from "next/router";
import { Customers } from "./customer";
import { Status } from "./global";
export interface SideBar {
  icon?: keyof typeof svgs;
  title: string;
  pathname?: string;
  role: number[];
  inner?: SideBar[];
  className?: string;
}

export interface SubMenu {
  title: string;
  pathname: string;
  icon?: keyof typeof svgs;
}
export interface SVGIconProp {
  className?: string;
  pathClass?: string;
}

export interface MyComponentProp {
  children: ReactNode;
}

export interface UserAccountCardProp extends MyComponentProp {
  containerClassName?: string;
  tabsArray: tabArrayTypes[];
  secondChildClassName?: string;
  borderColor?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
}

export interface Person {
  name: string;
  email: string;
  address?: Address;
}
export interface CheckProps {
  condition?: boolean;
  truthy: string;
  falsy: string;
}
export interface tabArrayTypes {
  name: string;
  content?: React.ReactNode;
  icon: string;
}

export interface tabsSectionTypes {
  tabsArray: tabArrayTypes[];
  setTabType: (tabType: string) => void;
  tabType: string;
}

export interface articlesSectionTypes {
  name: string;
  content?: React.ReactNode;
}
export interface SideBarCardProps {
  articlesSection: articlesSectionTypes[];
  setArticleType: (articleType: number) => void;
  articleType: number;
}
export interface detailScreenCardsLayout {
  currentFormStage?: string;
  children: ReactNode;
}

export interface successPopup {
  heading: string;
  description: string;
  button1?: string;
  button2?: string;
}
export interface reportAndCancel {
  description: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  label5: string;
  label6: string;
  textAreaLabel: string;
  placeholder: string;
  checkBoxLabel: string;
  button1: string;
  button2: string;
}

export type GenerateFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  user: User,
  trigger?: UseFormTrigger<FieldValues>,
  control?: Control<FieldValues>,
  nextFormHandler?: Function
) => FormField[];
export type GenerateRegistrationFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control?: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>,
  setCurrentFormStage?: stateDispatch<SetStateAction<string>>,
  router?: NextRouter,
  onClick?: Function
) => FormField[];

export type GenerateResetPasswordFormField = (
  register: UseFormRegister<FieldValues>,
  loading: boolean,
  onClick: Function
) => FormField[];

export type GenerateCustomerFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  isUpdate: boolean,
  handleUpdateCancel: () => void,
  properties: CustomerProperties,
  control?: Control<FieldValues>,
) => FormField[];
export interface CustomerProperties  {
  phone?: string;
  mobile?: string;
}
export type GenerateFormContactField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  user: User | null,
  setValue?: UseFormSetValue<FieldValues>,
  watch?: UseFormWatch<FieldValues>,
  control?: Control<FieldValues>,
  dispatch?: Dispatch,
  onClick?: Function,
  nextFormHandler?: Function,
  phone?: string,
  verifyPhoneOtp?: Function,
  otp?: string,
  setError?: UseFormSetError<FieldValues>,
  translate?: Function
) => FormField[];
export type GenerateFormAddressField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  country: CountryType,
  control?: Control<FieldValues>
) => FormField[];

// Image upload form field
export type ImageUploadFormFieldType = (
  register: UseFormRegister<FieldValues>,
  control?: Control<FieldValues>,
  onClick?: Function
) => FormField[];

// accounting setting formfield
export type GenerateAccountSettingFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// change mail setting formfield
export type GenerateChangeMailSettingFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control?: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

// edit payment details formfield
export type GenerateEditPaymentDetailsFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// add reason formfield
export type GenerateAddReasonFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

// change/Reset password formfield
export type GenerateChangePasswordFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Add & Exclusive Tax formfield
export type GenerateAddTaxFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

// contact-support formfield
export type GenerateContactSupportFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control?: Control<FieldValues>,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// content formfield
export type GenerateContentFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Employee formfield
export type GenerateEmployeeFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  isUpdate: boolean,
  handleUpdateCancel: () => void,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Notes formfield
export type GenerateNotesFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

// Servcies formfield
export type GenerateServicesFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  isUpdate: boolean,
  handleUpdateCancel: () => void,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Invoice formfield
export type GenerateInvoiceFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  markItRecuring: boolean,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Contract formfield
export type GenerateContractFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onBack?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Contract formfield
export type GenerateOffersFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: () => void,
  count?: number
) => FormField[];

// Contract formfield
export type GenerateLeadsFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

export type GeneratePlansFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  isUpdate: boolean,
  handleUpdateCancel: () => void,
  control?: Control<FieldValues>
) => FormField[];


// follow-up formfield
export type GenerateAddPostPonedNoteFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// accounting setting formfield
export type GenerateAccountSettingAdminFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

// accounting setting formfield
export type GeneratePaymentSettingFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  containerClassName?: string;
}

export interface PaginationItemProps {
  handlePageClick: ButtonClickFunction;
  icon: any;
  className?: string;
  disabled?: boolean;
}

export interface LoaderType {
  height: string;
  width: string;
  radius: string;
  color: string;
}

export interface CheckBoxType {
  label: string;
  type: keyof Status;
}

export interface FilterType {
  text: string;
  sortBy: string;
  type: string;
  location: string;
}
export interface FilterProps {
  filter: FilterType;
  setFilter: React.Dispatch<SetStateAction<FilterType>>;
  moreFilter: boolean;
  setMoreFilter: React.Dispatch<SetStateAction<boolean>>;
  handleFilterResetToInitial: () => void;
  handleFilterReset: (key: keyof FilterType, value: string) => void;
  handleItemSelected: (val: string) => void;
  typeList: ItemList[];
}

interface ItemList {
  item: string;
}

export type Errors = Record<string, any> | undefined;


export interface DateRangeValueProps {
  selection: DateRangeSelectionProps
}
interface DateRangeSelectionProps {
  startDate: string;
  endDate: string;

}