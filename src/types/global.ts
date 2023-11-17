import { FieldValue, FieldValues } from 'react-hook-form';
// import { ModalType } from "@/enums";

import { ApiResponse, Header } from "@/enums/auth";
import { ModalType } from "@/enums/ui";
import { SetStateAction } from "react";
import { FieldValue, SubmitHandler } from "react-hook-form";

export interface GlobalState {
  loading: boolean;
  file: object | null;
  modal: {
    type: ModalType.NONE;
    cardId?: number;
    data?: any
  };
}

export type TranslatorFunction = (value: any) => any;
export interface Status {
  open?: boolean;
  close?: boolean;
  expired?: boolean;
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
  type: keyof Status
}
export interface CheckFieldProps {
  label: string;
  checkboxFilter: Status;
  setCheckBoxFilter: React.Dispatch<React.SetStateAction<Status>>;
  type: keyof Status;
}
export interface InputFieldProps {
  value: string;
  handleChange: (value: string) => void;
  containerClassName?: string;
  textClassName?: string;
  bgColor?: boolean,
  iconDisplay?: boolean
}

export interface OptionsFieldProps {
  value: string;
  title?: string;
  label?: string;
  border?: number;
  handleChange: (value: string) => void;
  options: string[];
  dropDownIconClassName: string;
  isOpen: string;
  setIsOpen: SetStateAction<any>;
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
    [Header.data]: Record<string, any>
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
  loading:boolean

}