// import { ModalType } from "@/enums";

import { ModalType } from "@/enums/ui";
import { SetStateAction } from "react";

export interface GlobalState {
  loading: boolean;
  file: object | null;
  modal: {
    type: ModalType.NONE;
    cardId?: number;
  };
}

export type TranslatorFunction = (value: any) => any;
export interface Status {
  open: boolean;
  close?: boolean;
  expired?: boolean;
  signed?: boolean;
  rejected?: boolean;
  confirmed?: boolean;
  cancelled?: boolean;
  overdue?: boolean;
  paid?: boolean;
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
  isOpen: boolean;
  setIsOpen: SetStateAction<any>;
}
