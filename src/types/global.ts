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
  close: boolean;
  expired: boolean;
}

export interface CheckFieldProps {
  title: string;
  label: string;
  options: string[];
  border: number;
  value: boolean;
  handleChange: (value: boolean) => void;
  filter: Status;
  setFilter: React.Dispatch<React.SetStateAction<Status>>
  type: string;
}
export interface InputFieldProps {
  value: string;
  title?: string;
  label?: string;
  border?: number;
  handleChange: (value: string) => void;
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
