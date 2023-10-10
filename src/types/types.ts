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
export interface SideBar {
  icon: string;
  title: string;
  pathname: string;
  role: Array<number>[];
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
}
export interface tabsSectionTypes {
  tabsArray: tabArrayTypes[];
  setTabType: (tabType: number) => void;
  tabType: number;
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
  router?: NextRouter
) => FormField[];
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

export interface TableRowTypes {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  location: string;
  status?: string;
  type?: string;
}
export interface TableRowEmailTracker {
  id: number;
  recipient: string;
  subject: string;
  sendAt: {
    time: string;
    date: string;
  };
  viewedAt: {
    time: string;
    date: string;
  };
  status: {
    text: string;
    colorClass: string;
  };
}

// Interface for the services table
export interface TRowServices {
  id: string;
  service: string;
  createdOn: Date | null;
  price: {
    value: number;
    currency: string;
  };
  description: string;
  action: "edit";
}

// Interface for the services table
export interface TRowEmployees {
  id: string;
  name: string;
  email: string;
  phone: number;
  designation: string;
  createdOn: Date | null;
  action: "edit";
}

// export interface SuccessMessage {
//   image:Image
// }
