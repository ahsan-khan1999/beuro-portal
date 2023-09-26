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
import { ButtonProps } from "./ui";
import { CardType, Field, Salutation } from "@/enums";
import { Dispatch } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface BaseFieldProps<T extends Field> {
  type: T;
  id: string;
  name: string;
  className?: string;
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
  svg?: SVGElement;
  alt: string;
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
}

export interface OptionType {
  value: string;
  label: string;
}

export interface SelectProps extends BaseFieldProps<Field.select> {
  control?: Control<FieldValues>;
  options: OptionType[];
  value: string;
  trigger?: UseFormTrigger<FieldValues>;
}

export interface SelectBoxProps {
  id: string;
  options: OptionType[];
  trigger?: UseFormTrigger<FieldValues>;
  field?: ControllerRenderProps<FieldValues, string>;
  value: string;
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
}

export interface DragAndDropFileFieldProps
  extends BaseFieldProps<Field.dragAndDropFileField> {
  control?: Control<FieldValues>;
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

export interface DatePickerProps extends BaseFieldProps<Field.date> {
  register: UseFormRegister<FieldValues>;
  value?: string;
  className?: string;
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
}

export interface DivProps {
  type: Field.div;
  name?: string;
  children: FormField[];
  className?: string;
  errors?: Record<string, any>;
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
  | Field.creditCardNumberInput
  | Field.creditCardExpiryDateInput
  | Field.password
  | Field.select
  | Field.phone
  | Field.date
  | Field.checkbox
  | Field.radio
  | Field.dragAndDropFileField
  | Field.span
  | Field.div
  | Field.button
  | Field.link;
export type FieldProps =
  | InputProps
  | CreditCardInputProps
  | CreditCardExpiryDateInputProps
  | PasswordInputProps
  | SelectProps
  | PhoneProps
  | DatePickerProps
  | CheckBoxProps
  | RadioButtonProps
  | DragAndDropFileFieldProps
  | SpanProps
  | DivProps
  | ButtonProps
  | LinkProps;

export interface FormField {
  containerClass?: string;
  label?: LabelProps | null;
  field: FieldProps;
}

export interface FieldComponents {
  input: React.FC<InputProps>;
  creditCardNumberInput: React.FC<CreditCardInputProps>;
  creditCardExpiryDateInput: React.FC<CreditCardExpiryDateInputProps>;
  password: React.FC<PasswordInputProps>;
  select: React.FC<SelectProps>;
  phone: React.FC<PhoneProps>;
  date: React.FC<DatePickerProps>;
  checkbox: React.FC<CheckBoxProps>;
  radio: React.FC<RadioButtonProps>;
  dragAndDropFileField: React.FC<DragAndDropFileFieldProps>;
  span: React.FC<SpanProps>;
  div: React.FC<DivProps>;
  button: React.FC<ButtonProps>;
  link: React.FC<LinkProps>;
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
