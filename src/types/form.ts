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
import React, { ReactNode, SetStateAction } from "react";
import { CardType, Field, Salutation } from "@/enums/form";
import { User } from ".";
import { Attachement } from "./global";

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
  inputType: "text" | "email" | "number" | "tel";
  value?: string;
  success?: boolean;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  svg?: string;
  img?: boolean;
  remove?: string;
  onRemove?: () => void;
  fieldIndex?: number;
  onChange?: (value?: number) => void;
  percentage?: string;
  step?: string;
}
export interface QuantityInputProps
  extends BaseFieldProps<Field.quantityInput> {
  inputType: "text" | "number";
  inputLabelValue: string;
  value?: string;
  success?: boolean;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  svg?: string;
  fieldIndex?: number;
  onChange?: (value?: number) => void;
  step?: string;
}

export interface ColorPickerProps extends BaseFieldProps<Field.colorPicker> {
  value?: string;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
}

// textarea added
export interface TextAreaProps extends BaseFieldProps<Field.textArea> {
  register: UseFormRegister<FieldValues>;
  rows?: number;
  maxLength?: number;
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
export interface AgentOptionType {
  value: {
    picture: string;
    name: string;
  };
  label: { picture: string; name: string };
}

export interface SelectProps extends BaseFieldProps<Field.select> {
  control?: Control<FieldValues>;
  options: OptionType[];
  value?: string;
  svg?: string;
  onItemChange?: (id: string, index?: number) => void;
  trigger?: UseFormTrigger<FieldValues>;
  className?: string;
  disabled?: boolean;
  fieldIndex?: number;
  isLocalCustomer?: boolean;
  onSearchCustomer?: (value: string) => void;
}

export interface CustomTimePickerProps
  extends BaseFieldProps<Field.reactTimePicker> {
  control?: Control<FieldValues>;
  field?: ControllerRenderProps<FieldValues, string>;
  value?: string;
  svg?: string;
  dateType?: string;
  trigger?: UseFormTrigger<FieldValues>;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export interface AgentSelectProps
  extends BaseFieldProps<Field.agentSelectField> {
  control?: Control<FieldValues>;
  options: AgentOptionType[];
  value?: string;
  svg?: string;
  onItemChange?: (id: string, index?: number) => void;
  onEnterPress?: (text: string) => void;
  trigger?: UseFormTrigger<FieldValues>;
  className?: string;
  disabled?: boolean;
  fieldIndex?: number;
}

export interface SelectBoxProps {
  id: string;
  options: OptionType[];
  value: string;
  trigger?: UseFormTrigger<FieldValues>;
  field?: ControllerRenderProps<FieldValues, string>;
  svg?: string;
  onItemChange?: (id: string, index?: number) => void;
  onEnterPress?: (text: string) => void;
  success?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fieldIndex?: number;
  isLocalCustomer?: boolean;
  onSearchCustomer?: (value: string) => void;
}
export interface CustomLocationInputProps {
  id: string;
  setValue: UseFormSetValue<FieldValues>;
  field: ControllerRenderProps<FieldValues, string>;
}
export interface CustomLocationMainInputProps {
  id: string;
  name: string;
  control?: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export interface AgentSelectBoxProps {
  id: string;
  options: AgentOptionType[];
  value: string;
  trigger?: UseFormTrigger<FieldValues>;
  field?: ControllerRenderProps<FieldValues, string>;
  svg?: string;
  onItemChange?: (id: string, index?: number) => void;
  onEnterPress?: (text: string) => void;
  success?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fieldIndex?: number;
}

export interface MultiSelectProps extends BaseFieldProps<Field.select> {
  control?: Control<FieldValues>;
  options: OptionType[];
  value: string[];
  svg?: string;
  onItemChange?: () => void;
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
  onItemChange?: Function;
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
export interface CustomCheckBoxFieldProps
  extends BaseFieldProps<Field.customCheckBox> {
  description: string;
  register: UseFormRegister<FieldValues>;
  containerClassName?: string;
  textClassName?: string;
  label?: string;
  checked?: boolean;
}
export interface RadioButtonProps extends BaseFieldProps<Field.radio> {
  register: UseFormRegister<FieldValues>;
  label: string;
  value?: string;
  containerClassName?: string;
  textClassName?: string;
  colorClasses?: string;
  checked?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
  disabled?: boolean;
  onClick?: () => void;
  onChange?: (value: string, index?: number) => void;
  fieldIndex?: number;
}

export interface DragAndDropFileFieldProps
  extends BaseFieldProps<Field.dragAndDropFileField> {
  control?: Control<FieldValues>;
  value?: string;
}

// interface for the pdf file upload
export interface DragAndDropPdfFieldProps
  extends BaseFieldProps<Field.dragAndDropPdfField> {
  control?: Control<FieldValues>;
  isOpenedFile?: boolean;
  attachements?: Attachement[];
  setAttachements?: React.Dispatch<SetStateAction<any>>;
  isAttachement?: boolean;
}

// interface for the pdf file upload
export interface ProfileUploadFieldProps
  extends BaseFieldProps<Field.profileUploadField> {
  control?: Control<FieldValues>;
  iconClasses?: string;
  disabled?: boolean;
  isMailSetting?: boolean;
  isMailField?: boolean;
  isAgent?: boolean;
}

// interface for the Image upload
export interface ImageUploadFieldProps
  extends BaseFieldProps<Field.imageUploadField> {
  control?: Control<FieldValues>;
  onClick?: Function;
  value?: string;
  index?: number;
  setValue?: UseFormSetValue<FieldValues>;
}
export interface CustomFileUploadFieldProps
  extends BaseFieldProps<Field.customFileUpload> {
  control?: Control<FieldValues>;
  onClick?: Function;
  value?: string;
  index?: number;
  setValue?: UseFormSetValue<FieldValues>;
  attachements: Attachement[];
}

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

export interface SecurityTokenFieldProps {
  inputType: "text" | "email" | "number" | "password";
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
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
  value?: DateRangeProps;
  control?: Control<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  success?: boolean;
  disabled?: boolean;
  remove?: string;
  onRemove?: () => void;
}
export interface DateRangeProps {
  startDate: string;
  endDate: string;
}
export interface DatePickerProps extends BaseFieldProps<Field.date> {
  register: UseFormRegister<FieldValues>;
  value?: string;
  className?: string;
  remove?: string;
  svg?: string;
  success?: boolean;
  onRemove?: () => void;
  dateType?: string;
  min?: string;
  max?: string;
  disable?: boolean;
}

export interface CalendarDatePickerProps
  extends BaseFieldProps<Field.calendarDatePicker> {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  value?: string;
  className?: string;
  svg?: string;
  dateType?: string;
  min?: string;
  max?: string;
  disable?: boolean;
  placeholder?: string;
  onDateChange?: (name: string, value: string) => void;
}

export interface ColourSelectionOptions {
  dotColor: string;
  value: string;
}
export interface ColourSeclectionFieldProps
  extends BaseFieldProps<Field.colourSelectField> {
  value?: string;
  options: string[];
  containerClassName?: string;
  control?: Control<FieldValues>; // This should match the type expected by Controller
  onItemChange?: (id: string, index?: number) => void;
  trigger?: UseFormTrigger<FieldValues>; // Optional, for triggering validation
}

export interface remainderOptionType {
  label: string;
  value: number;
}
export interface RemainderSeclectionFieldProps
  extends BaseFieldProps<Field.remainderSelectField> {
  value?: number;
  options: remainderOptionType[];
  containerClassName?: string;
  control?: Control<FieldValues>;
  onItemChange?: (id: string, index?: number) => void;
  trigger?: UseFormTrigger<FieldValues>;
}
export interface LocationSearchInputFieldProps
  extends BaseFieldProps<Field.locationSearchInput> {
  id: string;
  name: string;
  // options: OptionType[];
  // value: string;
  setValue: UseFormSetValue<FieldValues>;
  control?: Control<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
  field?: ControllerRenderProps<FieldValues, string>;
  onItemChange?: (id: string, index?: number) => void;
  onEnterPress?: (text: string) => void;
  success?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface RemainderSelectProps {
  options: remainderOptionType[];
  containerClassName?: string;
  eventClassName?: string;
  id: string;
  name: string;
  value?: number;
  control?: Control<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
  register?: UseFormRegister<FieldValues>; // Change this to optional if not always needed
  onChange?: (value: number) => void;
}
export interface ColourSelectProps {
  options: string[];
  containerClassName?: string;
  id: string;
  name: string;
  value?: string;
  control?: Control<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
  register?: UseFormRegister<FieldValues>; // Change this to optional if not always needed
  onChange?: (value: string) => void;
}

export interface SpanProps {
  type: Field.span;
  text?: string | number;
  linkText?: string;
  linkHref?: string;
  containerClassName?: string;
  linkClassName?: string;
  name?: string;
  dispatch?: Dispatch;
  onClick?: Function;
  id: string;
  html?: string;
}

export interface IconLabelProps {
  type: Field.iconLabel;
  text?: string | number;
  id: string;
  name: string;
  icon: string;
  containerClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  isLocation?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
}

export interface Location {
  lat: number | null;
  lng: number | null;
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
  | Field.colorPicker
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
  | Field.multiSelect
  | Field.addField
  | Field.toggleButton
  | Field.agentSelectField
  | Field.timePicker
  | Field.quantityInput
  | Field.customCheckBox
  | Field.customFileUpload
  | Field.iconLabel
  | Field.calendarDatePicker
  | Field.colourSelectField
  | Field.remainderSelectField
  | Field.locationSearchInput
  | Field.reactTimePicker;

export type FieldProps =
  | InputProps
  | ColorPickerProps
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
  | MultiSelectProps
  | AddFieldProps
  | ToggleButtonFormProps
  | AgentSelectProps
  | TimePickerProps
  | QuantityInputProps
  | CustomCheckBoxFieldProps
  | CustomFileUploadFieldProps
  | IconLabelProps
  | CalendarDatePickerProps
  | ColourSeclectionFieldProps
  | RemainderSeclectionFieldProps
  | LocationSearchInputFieldProps
  | CustomTimePickerProps;

export interface FormField {
  containerClass?: string;
  label?: LabelProps | null;
  field: FieldProps;
}

export interface FieldComponents {
  input: React.FC<InputProps>;
  colorPicker: React.FC<ColorPickerProps>;
  textArea: React.FC<TextAreaProps>;
  ckEditor: React.FC<CKEditorProps>;
  customerInput: React.FC<InputProps>;
  creditCardExpiryDateInput: React.FC<CreditCardExpiryDateInputProps>;
  password: React.FC<PasswordInputProps>;
  select: React.FC<SelectProps>;
  phone: React.FC<PhoneProps>;
  date: React.FC<DatePickerProps>;
  checkbox: React.FC<CheckBoxProps>;
  customCheckBox: React.FC<CustomCheckBoxFieldProps>;
  radio: React.FC<RadioButtonProps>;
  dragAndDropFileField: React.FC<DragAndDropFileFieldProps>;
  dragAndDropPdfField: React.FC<DragAndDropPdfFieldProps>;
  profileUploadField: React.FC<ProfileUploadFieldProps>;
  imageUploadField: React.FC<ImageUploadFieldProps>;
  customFileUpload: React.FC<CustomFileUploadFieldProps>;
  span: React.FC<SpanProps>;
  div: React.FC<DivProps>;
  button: React.FC<ButtonProps>;
  addField: React.FC<AddFieldProps>;
  link: React.FC<LinkProps>;
  multiSelect: React.FC<MultiSelectProps>;
  toggleButton: React.FC<ToggleButtonFormProps>;
  agentSelectField: React.FC<AgentSelectProps>;
  timePicker: React.FC<TimePickerProps>;
  quantityInput: React.FC<QuantityInputProps>;
  iconLabel: React.FC<IconLabelProps>;
  calendarDatePicker: React.FC<CalendarDatePickerProps>;
  colourSelectField: React.FC<ColourSeclectionFieldProps>;
  remainderSelectField: React.FC<RemainderSeclectionFieldProps>;
  locationSearchInput: React.FC<LocationSearchInputFieldProps>;
  reactTimePicker: React.FC<CustomTimePickerProps>;
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
  user?: User;
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
export interface ToggleButtonFormProps
  extends BaseFieldProps<Field.toggleButton> {
  register: UseFormRegister<FieldValues>;
  className: string;
  checked: boolean;
  onClick?: () => void;
}

export interface TimePickerProps extends BaseFieldProps<Field.timePicker> {
  register: UseFormRegister<FieldValues>;
  value?: string;
  className?: string;
  remove?: string;
  svg?: string;
  success?: boolean;
  onRemove?: () => void;
  dateType?: string;
  min?: string;
  max?: string;
  handleChange: (date: any) => void;
  placeholder?: string;
}
