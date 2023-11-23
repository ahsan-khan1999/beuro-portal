import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  Control,
  UseFormWatch,
  UseFormSetValue,
  ControllerRenderProps,
  UseFormTrigger,
  FieldError,
  UseFormSetError,
} from "react-hook-form";
import { AddFieldProps, ButtonProps } from "./ui";
import { Dispatch } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import { CardType, Field, Salutation } from "@/enums/form";
import { User } from ".";

interface BaseFieldProps<T extends Field> {
  type: T;
  id: string;
  name: string;
  className?: string;
  text?: string;
  fileSupported?: string;
}

export interface LabelProps {
  text: string;
  htmlFor: string;
  className?: string;
}

export interface InputProps extends BaseFieldProps<Field.input> {
  inputType: "text" | "email" | "number";
  value?: string;
  success?: boolean;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  svg?: string;
  img?: boolean;
}

// textarea added
export interface TextAreaProps extends BaseFieldProps<Field.textArea> {
  register: UseFormRegister<FieldValues>;
  rows?: number;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
}

// ckEditor is added
export interface CKEditorProps extends BaseFieldProps<Field.ckEditor> {
  value?: string;
  control: Control<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
}

// CKEditorBoxProps added
export interface CKEditorBoxProps {
  id: string;
  data?: string;
  field: ControllerRenderProps<FieldValues, string>;
  trigger?: UseFormTrigger<FieldValues>;
  name?: string;
  type: string;
}

export interface CreditCardInputProps
  extends BaseFieldProps<Field.creditCardNumberInput> {
  value?: string;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
}

export interface CreditCardExpiryDateInputProps
  extends BaseFieldProps<Field.creditCardExpiryDateInput> {
  value?: string;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
}

export interface PasswordInputProps extends BaseFieldProps<Field.password> {
  value?: string;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  isButton?: boolean;
  onClick?: Function;
  svg: string;
  alt: string;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface SelectProps extends BaseFieldProps<Field.select> {
  control?: Control<FieldValues>;
  options: OptionType[];
  value: string;
  svg?: string;
  onItemChange?: Function
  trigger?: UseFormTrigger<FieldValues>;
  className?: string;
  disabled?: boolean;
}

export interface SelectBoxProps {
  id: string;
  options: OptionType[];
  trigger?: UseFormTrigger<FieldValues>;
  field?: ControllerRenderProps<FieldValues, string>;
  value: string;
  svg?: string;
  onItemChange?: Function
  success?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}



export interface MultiSelectProps extends BaseFieldProps<Field.select> {
  control?: Control<FieldValues>;
  options: OptionType[];
  value: string[];
  svg?: string;
  onItemChange?: Function
  trigger?: UseFormTrigger<FieldValues>;
  className?: string;
  disabled?: boolean;
}

export interface MultiSelectBoxProps {
  id: string;
  options: OptionType[];
  trigger?: UseFormTrigger<FieldValues>;
  field?: ControllerRenderProps<FieldValues, string>;
  value: string[];
  svg?: string;
  onItemChange?: Function
  success?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
export interface CheckBoxProps extends BaseFieldProps<Field.checkbox> {
  register: UseFormRegister<FieldValues>;
  description: string;
  containerClassName?: string;
  textClassName?: string;
  label?: string;
}
export interface RadioButtonProps extends BaseFieldProps<Field.radio> {
  register: UseFormRegister<FieldValues>;
  label: string;
  value?: string | number;
  containerClassName?: string;
  textClassName?: string;
  checked?: boolean
}

export interface DragAndDropFileFieldProps
  extends BaseFieldProps<Field.dragAndDropFileField> {
  control?: Control<FieldValues>;
  value?: string
}

// interface for the pdf file upload
export interface DragAndDropPdfFieldProps
  extends BaseFieldProps<Field.dragAndDropPdfField> {
  control?: Control<FieldValues>;
  isOpenedFile?: boolean;
}

// interface for the pdf file upload
export interface ProfileUploadFieldProps
  extends BaseFieldProps<Field.profileUploadField> {
  control?: Control<FieldValues>;
}

// interface for the Image upload
export interface ImageUploadFieldProps
  extends BaseFieldProps<Field.imageUploadField> {
  control?: Control<FieldValues>;
  onClick?: Function;
  value?: string
}

// Interface for the input field copy
export interface InputWithCopyProps
  extends BaseFieldProps<Field.inputWithCopy> {
  inputType: "text" | "email" | "number" | "password";
  value?: string;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
}

export interface PhoneProps extends BaseFieldProps<Field.phone> {
  country: string;
  value?: string;
  control?: Control<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  success?: boolean;
  disabled?: boolean;
}
export interface MultiDateProps extends BaseFieldProps<Field.phone> {
  value?: string;
  control?: Control<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  success?: boolean;
  disabled?: boolean;
  remove?: string;
  onRemove?: () => void
}
export interface DatePickerProps extends BaseFieldProps<Field.date> {
  register: UseFormRegister<FieldValues>;
  value?: string;
  className?: string;
  remove?: string;
  svg?: string;
  success?: boolean;
  onRemove?: () => void;
  dateType?: string
}

export interface SpanProps {
  type: Field.span;
  text?: string;
  linkText?: string;
  linkHref?: string;
  containerClassName?: string;
  linkClassName?: string;
  name?: string;
  dispatch?: Dispatch;
  onClick?: Function;
  id: string;
}

export interface DivProps {
  type: Field.div;
  name?: string;
  children: FormField[];
  className?: string;
  errors?: Record<string, any>;
  id: string;
}

interface LinkImage {
  imageSrc: StaticImageData;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export interface LinkProps extends BaseFieldProps<Field.link> {
  linkText?: string;
  linkHref: string;
  linkImage?: LinkImage;
  containerClassName?: string;
  textClassName?: string;
  imageClassName?: string;
}

export type FieldPropsWithChildren = FieldProps & {
  childrenFields: FormField[];
  className?: string;
};

export type FieldType =
  | Field.input
  | Field.textArea
  | Field.ckEditor
  // | Field.creditCardNumberInput
  | Field.creditCardExpiryDateInput
  | Field.password
  | Field.select
  | Field.phone
  | Field.date
  | Field.checkbox
  | Field.radio
  | Field.dragAndDropFileField
  | Field.dragAndDropPdfField
  | Field.profileUploadField
  | Field.imageUploadField
  | Field.span
  | Field.div
  | Field.button
  | Field.link
  | Field.multiSelect;

export type FieldProps =
  | InputProps
  | TextAreaProps
  | CKEditorProps
  | InputWithCopyProps
  | CKEditorBoxProps
  | CreditCardInputProps
  | CreditCardExpiryDateInputProps
  | PasswordInputProps
  | SelectProps
  | PhoneProps
  | DatePickerProps
  | CheckBoxProps
  | RadioButtonProps
  | DragAndDropFileFieldProps
  | DragAndDropPdfFieldProps
  | ProfileUploadFieldProps
  | ImageUploadFieldProps
  | SpanProps
  | DivProps
  | ButtonProps
  | AddFieldProps
  | LinkProps
  | MultiSelectProps;


export interface FormField {
  containerClass?: string;
  label?: LabelProps | null;
  field: FieldProps;
}

export interface FieldComponents {
  input: React.FC<InputProps>;
  textArea: React.FC<TextAreaProps>;
  ckEditor: React.FC<CKEditorProps>;
  // ckEditorBox: React.FC<CKEditorBoxProps>;
  customerInput: React.FC<InputProps>;
  // creditCardNumberInput: React.FC<CreditCardInputProps>;
  creditCardExpiryDateInput: React.FC<CreditCardExpiryDateInputProps>;
  password: React.FC<PasswordInputProps>;
  select: React.FC<SelectProps>;
  phone: React.FC<PhoneProps>;
  date: React.FC<DatePickerProps>;
  checkbox: React.FC<CheckBoxProps>;
  radio: React.FC<RadioButtonProps>;
  dragAndDropFileField: React.FC<DragAndDropFileFieldProps>;
  dragAndDropPdfField: React.FC<DragAndDropPdfFieldProps>;
  profileUploadField: React.FC<ProfileUploadFieldProps>;
  imageUploadField: React.FC<ImageUploadFieldProps>;
  span: React.FC<SpanProps>;
  div: React.FC<DivProps>;
  button: React.FC<ButtonProps>;
  // addField: React.FC<AddFieldProps>;
  link: React.FC<LinkProps>;
  dateRange: React.FC<MultiDateProps>;
  multiSelect: React.FC<MultiSelectProps>;
}

export interface FormProps {
  formFields: FormField[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors?: Record<string, any>;
  onSubmit: SubmitHandler<FieldValues>;
  className?: string;
}

export interface IPersonalDetailsInputs {
  salutation: Salutation;
  fullName: string;
  userName: string;
  DOB: string;
}

export interface FormComponentProps {
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  control?: Control<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  nextFormHandler: Function;
  setError?: UseFormSetError<FieldValues>;
  currentFormStage?: string;
  setCurrentFormStage?: any;
  user?: User
}

export interface FormFooterProps {
  title: string;
  linkHref: string;
  linkText: string;
}

export interface DetectedCardInfo {
  type: CardType;
  format: number[];
}

export type CreditCardIconsType = Record<CardType, StaticImageData>;

export interface GetCreditCardIconProps {
  cardType: DetectedCardInfo | null;
  icons: Record<CardType, StaticImageData>;
}

export interface CustomHookFormProps {
  children: ReactNode;
  className?: string;
}
export interface HookFieldProps {
  [key: string]: JSX.Element;
}
