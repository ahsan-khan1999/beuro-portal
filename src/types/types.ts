import { svgs } from "./../base-components/SideBar";
import { ReactNode, SetStateAction, Dispatch as stateDispatch } from "react";
import { DateRangeProps, FormField } from "./form";
import {
  Control,
  FieldValues,
  SetFieldValue,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { User } from "./auth";
import { ButtonClickFunction, CountryType } from "./ui";
import { NextRouter } from "next/router";
import { Customers } from "./customer";
import { Attachement } from "./global";
import { Employee } from "./employee";
import { CustomerAddress, Lead } from "./leads";
import { Service } from "./service";
import { ContentTableRowTypes } from "./content";
import { OffersTableRowTypes, ServiceList, Total } from "./offers";
import {
  InvoiceDetailTableRowTypes,
  InvoiceTableRowTypes,
  SubInvoiceTableRowTypes,
} from "./invoice";
import { Contract, contractTableTypes } from "./contract";
import {
  EmailSetting,
  EmailTemplate,
  FollowUp,
  GeneralAddress,
} from "./settings";
import {
  NoteSetting,
  SystemSetting,
  TaxSetting,
} from "@/api/slices/settingSlice/settings";
import { ServiceType } from "@/enums/offers";
import { staticEnums } from "@/utils/static";
import { Appointments, Report } from "./appointments";

export interface SideBar {
  icon?: keyof typeof svgs;
  title: string;
  pathname?: string;
  query?: string;
  queryName?: string;
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
  className?: string;
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
  id?: string;
}
export interface MobileTabArrayTypes {
  name: string;
  content?: React.ReactNode;
  icon: string;
  id?: string;
  type: number;
  backgroundColor?: string;
}
export interface stepFormArrayTypes {
  name: string;
  content?: React.ReactNode;
  icon: string;
  id?: string;
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
  containerClassName?: string;
  isAgent?: boolean;
}

export interface TableCardLayoutProps {
  children: ReactNode;
  containerClassName?: string;
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

export type GenerateCompanyProfileFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control?: Control<FieldValues>,
  properties?: User,
  setCurrentFormStage?: stateDispatch<SetStateAction<string>>
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
  properties: { customer?: Customers; customerType?: string },
  control?: Control<FieldValues>,
  isAddNewCustomer?: boolean,
  setValue?: SetFieldValue<FieldValues>
) => FormField[];
export interface CustomerProperties {
  phoneNumber?: string;
  mobileNumber?: string;
  customerType?: string;
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
  loading: boolean,
  control?: Control<FieldValues>,
  onClick?: Function,
  setValue?: UseFormSetValue<FieldValues>
) => FormField[];

// accounting setting formfield
export type GenerateAccountSettingFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  user?: User,
  handleRestore?: () => void
) => FormField[];

// change mail setting formfield
export type GenerateChangeMailSettingFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control?: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

// change mail setting formfield
export type GenerateQRCodeSettingFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  append: UseFieldArrayAppend<FieldValues, "QrCodeDetail">,
  onRemove: UseFieldArrayRemove,
  count: number,
  user: User,
  handleOnChangeStatus?: (index?: string, value?: string) => void
) => FormField[];

// change mail setting formfield
export type GenerateEmailTemplateFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  emailSettings: EmailSetting | null,
  control?: Control<FieldValues>,
  setValue?: UseFormSetValue<FieldValues>,
  data?: any
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
  onClick?: Function,
  control?: Control,
  reason?: string
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

export type GenerateAddTaskFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  isRemainder: boolean,
  startDate: string,
  endDate: string,
  setValue: UseFormSetValue<FieldValues>,
  isAllDay?: boolean,
  colour?: string,
  alertTime?: number,
  control?: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

export type GenerateRemainderFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control?: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

export type GenerateGeneralAddressFormField = (
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
  user?: User
) => FormField[];

// content formfield
export type GenerateContentFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: () => void,
  trigger?: UseFormTrigger<FieldValues>,
  count?: number,
  attachements?: Attachement[],
  setAttachements?: React.Dispatch<SetStateAction<Attachement[]>>,
  contentDetails?: ContentTableRowTypes,
  append?: UseFieldArrayAppend<FieldValues, "offerContent.address">,
  onRemove?: UseFieldArrayRemove,
  offerDescriptionCount?: string
) => FormField[];
// Employee formfield
export type GenerateEmployeeFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  isUpdate: boolean,
  handleUpdateCancel: () => void,
  employeeDetails?: Employee,
  isCreate?: boolean,
  control?: Control<FieldValues>
) => FormField[];

export type GenerateAgentSettingFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control?: Control<FieldValues>,
  onCancel?: () => void,
  onPasswordChange?: () => void
) => FormField[];

export type GenerateScheduleAppointmentsFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  properties: {
    onClose: () => void;
    appointmentDetails?: Appointments;
    // employee: Employee[];
    isUpdate?: boolean;
    onClick?: Function;
    handleChangeTimeField?: (type: string, date: string) => void;
  },
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Notes formfield
export type GenerateNotesFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  properties: {
    noteSetting?: NoteSetting[] | null;
    onNoteSelect?: (id: string) => void;
    selectedNote?: string;
  },
  onClick?: Function,
  getValues?: UseFormGetValues<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

export type GenerateGeneralNotesFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>,
  onClick?: Function
) => FormField[];

export type GenerateEnterCompanyNameFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

export type GenerateUpdateNoteFormField = (
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
  invoiceDetails?: InvoiceTableRowTypes,
  type?: string,
  data?: SubInvoiceTableRowTypes
) => FormField[];

// Contract formfield
export type GenerateOfferFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  onBack?: Function,
  content?: ContentTableRowTypes[],
  contentDetails?: ContentTableRowTypes,
  onContentSelect?: (id: string) => void,
  attachements?: Attachement[],
  setAttachements?: React.Dispatch<SetStateAction<Attachement[]>>,
  details?: OffersTableRowTypes,
  moreEmail?: { isCc: boolean; isBcc: boolean },
  setMoreEmail?: SetStateAction<any>,
  setValue?: UseFormSetValue<FieldValues>
) => FormField[];
export type GenerateContractFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  onBack?: Function,
  content?: ContentTableRowTypes[],
  contentDetails?: ContentTableRowTypes,
  onContentSelect?: (id: string) => void,
  attachements?: Attachement[],
  setAttachements?: React.Dispatch<SetStateAction<Attachement[]>>,
  details?: contractTableTypes,
  moreEmail?: { isCc: boolean; isBcc: boolean },
  setMoreEmail?: SetStateAction<any>,
  setValue?: UseFormSetValue<FieldValues>
) => FormField[];
export type GenerateInvoiceEmailFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  onBack?: Function,
  content?: ContentTableRowTypes[],
  contentDetails?: ContentTableRowTypes,
  onContentSelect?: (id: string) => void,
  attachements?: Attachement[],
  setAttachements?: React.Dispatch<SetStateAction<Attachement[]>>,
  details?: SubInvoiceTableRowTypes,
  moreEmail?: { isCc: boolean; isBcc: boolean },
  setMoreEmail?: SetStateAction<any>,
  setValue?: UseFormSetValue<FieldValues>,
  contentLoading?: boolean
) => FormField[];
// Contract formfield
export type GenerateOffersFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: () => void | Function,
  count: number,
  properties: {
    content?: ContentTableRowTypes[];
    contentDetails?: ContentTableRowTypes;
    customerType?: string;
    type?: string;
    customer?: Customers[];
    onCustomerSelect?: (id: string) => void;
    customerDetails?: Customers;
    onCancel?: () => void;
    leadDetails?: Lead;
    service?: Service[];
    handleRemove?: (id: string) => void;
    onContentSelect?: (id: string) => void;
    offerDetails?: OffersTableRowTypes;
    selectedContent?: string;
    invoiceDetails?: InvoiceDetailTableRowTypes;
  },
  setValue?: SetFieldValue<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

export type GenerateCreateInvoiceFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: () => void | Function,
  count: number,
  properties: {
    content?: ContentTableRowTypes[];
    contentDetails?: ContentTableRowTypes;
    customerType?: string;
    type?: string;
    customer?: Customers[];
    onCustomerSelect?: (id: string) => void;
    customerDetails?: Customers;
    onCancel?: () => void;
    leadDetails?: Lead;
    service?: Service[];
    handleRemove?: (id: string) => void;
    onContentSelect?: (id: string) => void;
    offerDetails?: OffersTableRowTypes;
    selectedContent?: string;
    invoiceDetails?: InvoiceDetailTableRowTypes;
  },
  setValue?: SetFieldValue<FieldValues>,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

// Generate Euit date form-field
export type GenerateEditDateFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>
) => FormField[];

export type GenerateOfferServiceFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  properties: {
    isTax?: boolean;
    isDiscount?: boolean;
    taxType?: number;
    discountType?: number;
    offerDetails?: OffersTableRowTypes;
    generateTotal?: () => void;
    customerType?: string;
    type?: string;
    customer?: Customers[];
    onCustomerSelect?: (id: string, index: number) => void;
    serviceDetails?: Service;
    onCancel?: () => void;
    leadDetails?: Lead;
    service?: Service[];
    handleRemove?: (id: string) => void;
    generatePrice?: (index: number) => void;
    total?: Total;
    tax?: TaxSetting[] | null;
    currency?: string;
    invoiceDetails?: InvoiceDetailTableRowTypes;
  },
  handleAddNewAddress: UseFieldArrayAppend<FieldValues, "serviceDetail">,
  handleRemoveService: (index: number) => void,
  serviceType: ServiceType[],
  onServiceChange: (index: number, value: ServiceType) => void,
  fields?: object[],
  setValue?: SetFieldValue<FieldValues>,
  watch?: UseFormWatch<FieldValues>
) => FormField[];

export type GenerateReportServiceFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  properties: {
    isTax?: boolean;
    isDiscount?: boolean;
    taxType?: number;
    discountType?: number;
    reportDetails?: Report;
    generateTotal?: () => void;
    customerType?: string;
    type?: string;
    customer?: Customers[];
    onCustomerSelect?: (id: string, index: number) => void;
    serviceDetails?: Service;
    onCancel?: () => void;
    leadDetails?: Lead;
    service?: Service[];
    handleRemove?: (id: string) => void;
    generatePrice?: (index: number) => void;
    total?: Total;
    tax?: TaxSetting[] | null;
    currency?: string;
    invoiceDetails?: InvoiceDetailTableRowTypes;
  },
  handleAddNewAddress: UseFieldArrayAppend<FieldValues, "serviceDetail">,
  handleRemoveService: (index: number) => void,
  serviceType: ServiceType[],
  onServiceChange: (index: number, value: ServiceType) => void,
  fields?: object[],
  setValue?: SetFieldValue<FieldValues>,
  watch?: UseFormWatch<FieldValues>
) => FormField[];

export type GenerateReportServiceDescriptionFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  properties: {
    isTax?: boolean;
    isDiscount?: boolean;
    taxType?: number;
    discountType?: number;
    reportDetails?: Report;
    generateTotal?: () => void;
    customerType?: string;
    type?: string;
    customer?: Customers[];
    onCustomerSelect?: (id: string, index: number) => void;
    serviceDetails?: Service;
    onCancel?: () => void;
    leadDetails?: Lead;
    service?: Service[];
    handleRemove?: (id: string) => void;
    generatePrice?: (index: number) => void;
    total?: Total;
    tax?: TaxSetting[] | null;
    currency?: string;
    invoiceDetails?: InvoiceDetailTableRowTypes;
  },
  handleAddNewAddress: UseFieldArrayAppend<FieldValues, "serviceDetail">,
  handleRemoveService: (index: number) => void,
  serviceType: ServiceType[],
  onServiceChange: (index: number, value: ServiceType) => void,
  fields?: object[],
  setValue?: SetFieldValue<FieldValues>,
  isMobile?: boolean,
  isTablet?: boolean,
  watch?: UseFormWatch<FieldValues>
) => FormField[];

export type GenerateAgentReportServiceFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  properties: {
    isTax?: boolean;
    isDiscount?: boolean;
    taxType?: number;
    discountType?: number;
    offerDetails?: OffersTableRowTypes;
    generateTotal?: () => void;
    customerType?: string;
    type?: string;
    customer?: Customers[];
    onCustomerSelect?: (id: string, index: number) => void;
    serviceDetails?: Service;
    onCancel?: () => void;
    leadDetails?: Lead;
    service?: Service[];
    handleRemove?: (id: string) => void;
    generatePrice?: (index: number) => void;
    total?: Total;
    tax?: TaxSetting[] | null;
    currency?: string;
    invoiceDetails?: InvoiceDetailTableRowTypes;
  },
  handleAddNewAddress: UseFieldArrayAppend<FieldValues, "serviceDetail">,
  handleRemoveService: (index: number) => void,
  serviceType: ServiceType[],
  onServiceChange: (index: number, value: ServiceType) => void,
  fields?: object[],
  setValue?: SetFieldValue<FieldValues>,
  watch?: UseFormWatch<FieldValues>
) => FormField[];

export type GenerateInvoiceServiceFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  properties: {
    isTax?: boolean;
    isDiscount?: boolean;
    taxType?: number;
    discountType?: number;
    offerDetails?: OffersTableRowTypes;
    generateTotal?: () => void;
    customerType?: string;
    type?: string;
    customer?: Customers[];
    onCustomerSelect?: (id: string, index: number) => void;
    serviceDetails?: Service;
    onCancel?: () => void;
    leadDetails?: Lead;
    service?: Service[];
    handleRemove?: (id: string) => void;
    generatePrice?: (index: number) => void;
    total?: Total;
    tax?: TaxSetting[] | null;
    currency?: string;
    invoiceDetails?: InvoiceDetailTableRowTypes;
  },
  handleAddNewAddress: UseFieldArrayAppend<FieldValues, "serviceDetail">,
  handleRemoveService: (index: number) => void,
  serviceType: ServiceType[],
  onServiceChange: (index: number, value: ServiceType) => void,
  fields?: object[],
  setValue?: SetFieldValue<FieldValues>,
  watch?: UseFormWatch<FieldValues>
) => FormField[];

export type GenerateOffersServiceActionFormField = (
  loader: boolean,
  onClick: () => void
) => FormField[];

export type GenerateReportServiceActionFormField = (
  loader: boolean,
  onHandleBack?: Function
) => FormField[];

export type GenerateInvoiceServiceActionFormField = (
  loader: boolean,
  onClick: () => void
) => FormField[];

export type GenerateOfferDateFormField = (
  register: UseFormRegister<FieldValues>,
  onClick: UseFieldArrayAppend<FieldValues, "date">,
  count: number,
  handleRemoveDateField: UseFieldArrayRemove,
  loading?: boolean,
  control?: Control<FieldValues>,
  wordDates?: { startDate: string; endDate: string }[]
) => FormField[];

export type GenerateInvoiceDateFormField = (
  register: UseFormRegister<FieldValues>,
  onClick: UseFieldArrayAppend<FieldValues, "date">,
  count: number,
  handleRemoveDateField: UseFieldArrayRemove,
  loading?: boolean,
  control?: Control<FieldValues>,
  wordDates?: { startDate: string; endDate: string }[]
) => FormField[];
// Contract formfield
export type GenerateLeadsFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  trigger?: UseFormTrigger<FieldValues>,
  content?: ContentTableRowTypes[],
  leadDetails?: Lead,
  systemSettings?: SystemSetting | null
) => FormField[];
export type GenerateCustomerLeadFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  leadDetails?: Lead,
  customerType?: string,
  setValue?: UseFormSetValue<FieldValues>
) => FormField[];

export type GenerateLeadsAdditionalDetailsFormField = (
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  leadDetails?: Lead
) => FormField[];

export type GenerateContractEditAdditionalDetailsFormField = (
  loader: boolean,
  control: Control<FieldValues>,
  onClick?: Function,
  contractDetails?: Contract
) => FormField[];

export type GenerateLeadAddressFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  handleChangeLabel: (item: string, index: number) => void,
  handleAddNewAddress?: () => void,
  handleRemoveAddress?: UseFieldArrayRemove,
  fields?: object[],
  handleFieldTypeChange?: (index: number) => void,
  addressType?: boolean[],
  setValue?: UseFormSetValue<FieldValues>,
  getValues?: UseFormGetValues<FieldValues>,
  addressSettings?: GeneralAddress | null
) => FormField[] | null;

export type GenerateEditInvoiceAddressFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  handleChangeLabel: (item: string, index: number) => void,
  handleAddNewAddress?: () => void,
  handleRemoveAddress?: UseFieldArrayRemove,
  fields?: object[],
  handleFieldTypeChange?: (index: number) => void,
  addressType?: boolean[],
  setValue?: UseFormSetValue<FieldValues>,
  getValues?: UseFormGetValues<FieldValues>,
  addressSettings?: GeneralAddress | null
) => FormField[] | null;

export type GenerateCreateInvoiceAddressFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onClick: Function,
  count: number,
  handleChangeLabel: (item: string, index: number) => void,
  handleAddNewAddress?: () => void,
  handleRemoveAddress?: UseFieldArrayRemove,
  fields?: object[],
  handleFieldTypeChange?: (index: number) => void,
  addressType?: boolean[],
  setValue?: UseFormSetValue<FieldValues>,
  getValues?: UseFormGetValues<FieldValues>,
  addressSettings?: GeneralAddress | null
) => FormField[] | null;

export type GenerateLeadsCustomerFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  properties: {
    offerDetails?: OffersTableRowTypes;
    customerType: string;
    type: string;
    customer: Customers[];
    onCustomerSelect: (id: string) => void;
    customerDetails: Customers;
    onCancel: () => void;
    leadDetails: Lead;
    lead?: Lead[];
    content?: ContentTableRowTypes[];
    handleContentSelect?: () => void;
    selectedContent?: string;
    leadID?: string;
    gender?: number;
  },
  setValue: SetFieldValue<FieldValues>
) => FormField[];

export type GenerateInvoiceCustomerFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  properties: {
    invoiceDetails?: InvoiceDetailTableRowTypes;
    customerType: string;
    type: string;
    customer: Customers[];
    onCustomerSelect: (id: string) => void;
    customerDetails: Customers;
    onCancel: () => void;
    leadDetails: Lead;
    lead?: Lead[];
    content?: ContentTableRowTypes[];
    handleContentSelect?: () => void;
    selectedContent?: string;
    leadID?: string;
    gender?: number;
  },
  setValue: SetFieldValue<FieldValues>
) => FormField[];

export type GeneratePlansFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  isUpdate: boolean,
  handleUpdateCancel: () => void,
  control?: Control<FieldValues>
) => FormField[];

// follow-up formfield
export type GenerateFollowUpFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  data: {
    customer: Customers[];
    lead: Lead[];
    followUps: FollowUp | null;
  },
  onItemChange?: Function,
  trigger?: UseFormTrigger<FieldValues>
) => FormField[];

export type GeneratePostPondFormField = (
  register: UseFormRegister<FieldValues>,
  loading: boolean,
  control: Control<FieldValues>
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

// appointment form
export type GenerateContactReportFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  setCurrentFormStage?: stateDispatch<SetStateAction<string>>
) => FormField[];

export type GenerateContactAddressReportFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  addressFieldsLength: number,
  addressFields?: object[],
  setCurrentFormStage?: stateDispatch<SetStateAction<string>>
) => FormField[];

export type GenerateHouseDetailReportFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onHandleBack?: Function,
  setCurrentFormStage?: stateDispatch<SetStateAction<string>>
) => FormField[];

export type GenerateAdditionalInfoReportFormField = (
  register: UseFormRegister<FieldValues>,
  loader: boolean,
  control: Control<FieldValues>,
  onHandleBack?: Function,
  setCurrentFormStage?: stateDispatch<SetStateAction<string>>
) => FormField[];

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  containerClassName?: string;
  currentPage: number;
  isPageInParam?: boolean;
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
  type: string;
}

export interface FilterType {
  text?: string;
  sort?: string;
  noteType?: string;
  type?: string;
  location?: string;
  status?: string[] | string;
  sending?: string;
  date?: {
    $gte?: string;
    $lte?: string;
  };
  paymentType?: string[] | string;
  email?: string[] | string;
  price?: string[];
  month?: number;
  leadSource?: string[] | string;
}

export interface MoreFilterType {
  text?: string;
  type?: string;
  location?: string;
  sort?: string;
  date?: {
    $gte?: string;
    $lte?: string;
  };
  email?: string[] | string;
  price?: string[];
  paymentType?: string[] | string;
  leadSource?: string[] | string;
}
export interface FilterProps {
  filter: FilterType;
  setFilter: React.Dispatch<SetStateAction<FilterType>>;
  onFilterChange: (filters: FilterType) => void;
  containerClassName?: string;
}

interface ItemList {
  item: string;
}

export type Errors = Record<string, any> | undefined;

export interface DateRangeValueProps {
  selection: DateRangeSelectionProps;
}
interface DateRangeSelectionProps {
  startDate: string;
  endDate: string;
}

export interface DocumentHeaderDetailsProps {
  offerNo?: string;
  offerDate?: string;
  createdBy: string;
  logo: string;
  emailTemplateSettings: EmailTemplate | null;
  fileType?: "contract" | "invoice" | "receipt" | "report";
  companyName?: string;
  isReverseLogo?: boolean;
  language?: string;
  isOffer?: boolean;
}

export interface ProductItemFooterProps {
  subTotal: string;
  tax: string;
  discount: string;
  discountPercentage: string;
  updatedDiscountAmount: string;
  grandTotal: string;
  invoiceStatus?: keyof (typeof staticEnums)["InvoiceStatus"];
  invoiceAmount?: string;
  dueAmount?: string;
  invoiceCreatedAmount?: string;
  invoicePaidAmount?: string;
  isShowExtraAmount?: boolean;
  isSubInvoicePdf?: boolean;
  isReceiptPdf?: boolean;
  isOfferPDF?: boolean;
  isContractPDF?: boolean;
  isMainInvoice?: boolean;
  systemSettings?: SystemSetting | null;
  discountType?: keyof (typeof staticEnums)["DiscountType"];
  taxType?: keyof (typeof staticEnums)["TaxType"];
  serviceDiscountSum?: number;
  isTax?: boolean;
  isDiscount?: boolean;
  discountDescription?: string;
  language?: string;
  paymentType?: string;
  isBreakPage?: boolean;
}

export interface ContactDetailsProps {
  address: {
    name: string;
    companyName?: string;
    streetWithNumber: string;
    postalCode: string;
    city: string;
  };
  email: string;
  phone: string;
  gender?: string;
  mobile?: string;
  isReverseInfo?: boolean;
}
export interface MovingDetailsProps {
  header?: string;
  address: CustomerAddress[];
  workDates?: DateRangeProps[];
  isOffer?: boolean;
  handleTitleUpdate?: (value: string) => void;
  handleDescriptionUpdate?: (value: string) => void;
  addressLabels?: string[];
  handleEditDateModal?: () => void;
  time?: string;
  isReverseAddress?: boolean;
  language?: string;
}
export interface ProductItemProps {
  title: string;
  description: string;
  price: string;
  count: string;
  total: string;
}

interface CompanyAddress {
  postalCode?: string;
  streetNumber?: string;
}

interface CompanyBankDetails {
  bankName?: string;
  accountNumber?: string;
  ibanNumber?: string;
}

interface CompanyDetailsFirstColumn {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  taxNumber?: number;
}

interface CompanyDetailsSecondColumn {
  address?: CompanyAddress;
  bankDetails?: CompanyBankDetails;
}

interface CompanyDetailsThirdColumn {
  row1?: string;
  row2?: string;
  row3?: string;
  row4?: string;
  row5?: string;
}

interface CompanyDetailsFourthColumn {
  row1?: string;
  row2?: string;
  row3?: string;
  row4?: string;
  row5?: string;
}

export interface DocumentDetailFooterProps {
  firstColumn?: CompanyDetailsFirstColumn;
  secondColumn?: CompanyDetailsSecondColumn;
  thirdColumn?: CompanyDetailsThirdColumn;
  fourthColumn?: CompanyDetailsFourthColumn;
  columnSettings: TemplateType | null;
  totalPages?: number;
  currPage?: number;
  emailTemplateSettings?: EmailTemplate | null;
}
export interface TemplateSettigsFirstColumn {
  isCompanyName: boolean;
  isEmail: boolean;
  isPhoneNumber: boolean;
  isTaxNumber: boolean;
  isWebsite: boolean;
  companyName: string;
  email: string;
  phoneNumber: string;
  taxNumber: string;
  website: string;
}
export interface TemplateSettigsSecondColumn {
  isAccountNumber: boolean;
  isBankName: boolean;
  isIBAN: boolean;
  isPostCode: boolean;
  isStreetNumber: boolean;
  streetNumber: string;
  postCode: string;
  bankName: string;
  accountNumber: string;
  iban: string;
}
export interface TemplateSettigsThirdColumn {
  isRow1: boolean;
  isRow2: boolean;
  isRow3: boolean;
  isRow4: boolean;
  isRow5: boolean;
  row1: string;
  row2: string;
  row3: string;
  row4: string;
  row5: string;
}
export interface TemplateSettigsFourthColumn {
  isRow1: boolean;
  isRow2: boolean;
  isRow3: boolean;
  isRow4: boolean;
  isRow5: boolean;
  row1: string;
  row2: string;
  row3: string;
  row4: string;
  row5: string;
}
export interface TemplateType {
  firstColumn: TemplateSettigsFirstColumn;
  secondColumn: TemplateSettigsSecondColumn;
  thirdColumn: TemplateSettigsThirdColumn;
  fourthColumn: TemplateSettigsFourthColumn;
  isFirstColumn: boolean;
  isSecondColumn: boolean;
  isThirdColumn: boolean;
  isFourthColumn: boolean;
  order: boolean;
}
interface Template {
  Template: TemplateType;
}
export interface CompanySettingsActionType {
  payload: Template;
  type: string;
}
export interface EmailSettingsActionType {
  payload: EmailSetting;
  type: string;
}

export interface EmailHeaderProps {
  offerNo?: string;
  emailStatus?: string;
  loading?: boolean;
  onEmailSend: () => void;
  onDownload: () => void;
  onPrint: () => void;
  handleSendByPost: () => void;
  activeButtonId: string | null;
  offerId?: string;
}
export interface InvoiceEmailHeaderProps {
  contractId?: string;
  contractTitle?: string;
  activeButtonId: string | null;
  workerName?: string;
  contentName?: string;
  contractStatus?: string;
  loading?: boolean;
  onEmailSend: () => void;
  onSendViaPost: () => void;
  onPrint: () => void;
  onDownload: () => void;
  title: string;
}

export interface ContractEmailHeaderProps {
  contractTitle: string;
  worker: string;
  offerNo?: string;
  emailStatus?: string;
  loading?: boolean;
  activeButtonId: string | null;
  onEmailSend: () => void;
  onSendViaPost: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

export interface ContentHeaderProps {
  headerDetails: DocumentHeaderDetailsProps;
  footerDetails: DocumentDetailFooterProps;
  aggrementDetails: string;
}

export interface ContentPdfPreviewerProps {
  data?: ContentHeaderProps;
  isOfferPdf?: boolean;
  templateSettings: TemplateType | null;
  emailTemplateSettings: EmailTemplate | null;
  description?: string;
  language?: string | undefined;
}

export interface PdfProps<T = EmailHeaderProps> {
  emailHeader?: Partial<T>;
  headerDetails: DocumentHeaderDetailsProps;
  contactAddress: ContactDetailsProps;
  movingDetails: MovingDetailsProps;
  houseDetails?: ReportHouseDetailsProps;
  offerDetails?: OfferDetailsProps;
  serviceItem: ServiceList[];
  serviceItemFooter: ProductItemFooterProps;
  footerDetails: DocumentDetailFooterProps;
  aggrementDetails: string;
  isOffer?: boolean;
  id?: string;
  signature?: string;
  attachement?: string;
  isCanvas?: boolean;
}

export interface PdfPreviewProps {
  data?: PdfProps<ContractEmailHeaderProps>;
  templateSettings: TemplateType | null;
  emailTemplateSettings: EmailTemplate | null;
  pdfFile?: any;
  setPdfFile?: SetStateAction<any>;
  fileName?: string;
  qrCode?: string;
  remoteFileBlob?: Blob | null;
  systemSetting?: SystemSetting | null;
  mergedPdfFileUrl?: string | null;
  isPdfRendering?: boolean;
  showContractSign?: boolean;
  companyName?: string;
  lang?: string | undefined;
  isOfferPdf?: boolean;
}
export interface ReportPdfPreviewProps {
  data?: ReportPDFProps;
  pdfFile?: any;
  setPdfFile?: SetStateAction<any>;
  fileName?: string;
  remoteFileBlob?: Blob | null;
  mergedPdfFileUrl?: string | null;
  isPdfRendering?: boolean;
  language?: string | undefined;
  systemSetting?: SystemSetting | null;
}

export interface PdfPreviewFooterProps {
  documentDetails?: DocumentDetailFooterProps;
  templateSettings: TemplateType | null;
  emailTemplateSettings: EmailTemplate | null;
}

export interface PurchasedItemsDetailsProps extends Omit<PdfProps, "qrCode"> {
  isShowTotal: boolean;
  templateSettings: TemplateType | null;
  totalPages: number;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings?: SystemSetting | null;
  handleEditDateModal?: () => void;
}
export interface PurchasedItemDetailsNextPageProps {
  headerDetails: DocumentHeaderDetailsProps;
  serviceItem: ServiceList[];
  serviceItemFooter: ProductItemFooterProps;
  footerDetails: DocumentDetailFooterProps;
  isShowTotal: boolean;
  templateSettings: TemplateType | null;
  totalPages: number;
  currPage: number;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings?: SystemSetting | null;
}

export interface qrCode {
  acknowledgementSlip: AcknowledgementSlipProps;
  payableTo: PayableToProps;
}
interface QRCodeBaseProps {
  accountDetails: {
    accountNumber: string;
    name: string;
    street: string;
    city: string;
  };
  referenceNumber: string;
  payableByDetails: {
    name: string;
    street: string;
    city: string;
  };
}
export interface AcknowledgementSlipProps extends QRCodeBaseProps {
  currency: string;
  amount: number;
}
export interface PayableToProps extends QRCodeBaseProps {
  additionalInformation: string;
}
export interface PaymentQrCodeDetailsProps {
  headerDetails: DocumentHeaderDetailsProps;
  contactAddress: ContactDetailsProps;
}
export interface QrCodeDetailsProps {
  qrCode: qrCode;
}
export interface AggrementProps {
  headerDetails: DocumentHeaderDetailsProps;
  contactAddress: ContactDetailsProps;
  footerDetails: DocumentDetailFooterProps;
  aggrementDetails: string;
  templateSettings: TemplateType | null;
  totalPages: number;
  currPage: number;
  isOffer?: boolean;
  handleDescriptionUpdate?: (value: string) => void;
  signature?: string;
  isCanvas?: boolean;
  setIsSignatureDone?: SetStateAction<boolean>;
  isSignatureDone?: boolean;
  emailTemplateSettings: EmailTemplate | null;
  setOfferSignature: SetStateAction<any>;
  systemSettings: SystemSetting | null;
  pdfData: PdfProps<any>;
  setComponentMounted: () => void;
}

export interface FiltersComponentProps {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (filter: FilterType) => void;
  isAgent?: boolean;
}
export interface ContractEmailHeaderProps {
  contractNo?: string;
  contractStatus?: string;
  loading?: boolean;
  onEmailSend: () => void;
  onDownload: () => void;
  onPrint: () => void;
  worker: string;
  contractTitle: string;
}
export interface InvoiceEmailCardProps {
  activeButtonId: string | null;
  loading?: boolean;
  onEmailSend: () => void;
  onSendViaPost: () => void;
}

export interface ReportHeaderProps {
  date: string;
}

export interface ReportDocumentHeaderProps {
  date: string;
  language?: string;
}

export interface ReportPDFOfferDetailsProps {
  language?: string;
  employees: number;
  deliveryVehicle: number;
  hours: number;
  cleaningWithHandoverGuarantee: number;
  broomClean: number;
  priceCHF: number;
  remarks: string;
  noteAndInformation: string;
}

export interface LivingRoomDetailsProps {
  sofa: number;
  teacherDesk: number;
  tvTable: number;
  armchair: number;
  table: number;
  shelf: number;
  LSofa: number;
  TV: number;
  decoBig: number;
  box: number;
  descriptions: string;
}

export interface KitchenDetailsProps {
  oven: number;
  refrigerator: number;
  freezer: number;
  stove: number;
  microwave: number;
  coffeeMachine: number;
  washingMachine: number;
  tumbler: number;
  shelf: number;
  box: number;
  descriptions: string;
}

export interface DedRoomDetailsProps {
  bed: number;
  doubleBed: number;
  armchair: number;
  smallWardrobe: number;
  mediumWardrobe: number;
  largeWardrobe: number;
  dressingTable: number;
  nightstand: number;
  shelf: number;
  desk: number;
  plants: number;
  box: number;
  descriptions: string;
}

export interface RoomDetailsProps {
  bed: number;
  doubleBed: number;
  armchair: number;
  smallWardrobe: number;
  mediumWardrobe: number;
  largeWardrobe: number;
  shelf: number;
  desk: number;
  tv: number;
  tvTable: number;
  nightstand: number;
  box: number;
  descriptions: string;
}

export interface OutDoorDetailsProps {
  grill: number;
  table: number;
  chairs: number;
  sofa: number;
  shelf: number;
  umbrella: number;
  pots: number;
  plants: number;
  herbGarden: number;
  lawnmower: number;
  descriptions: string;
}

export interface BasementAtticDetailsProps {
  washingMachine: number;
  tumbler: number;
  shelf: number;
  disposal: number;
  bicycle: number;
  stroller: number;
  furniture: number;
  boxes: number;
  descriptions: string;
}

export interface SpecialItemsDetailsProps {
  aquarium: number;
  piano: number;
  gymEquipment: number;
  electronics: number;
  pool: number;
  safe: number;
  lamp: number;
  descriptions: string;
}

export interface ReportHouseDetailsProps {
  livingRoomDetails: LivingRoomDetailsProps;
  kitchenDetails: KitchenDetailsProps;
  bedRoomDetails: DedRoomDetailsProps;
  roomDetails: RoomDetailsProps;
  outDoorDetails: OutDoorDetailsProps;
  basementAtticDetails: BasementAtticDetailsProps;
  specialItemsDetails: SpecialItemsDetailsProps;
}

export interface OfferDetailsProps {
  employees: number;
  deliveryVehicle: number;
  hours: number;
  cleaningWithHandoverGuarantee: number;
  broomClean: number;
  priceCHF: number;
  remarks: string;
  noteAndInformation: string;
}

export interface ReportMovingDetailsProps {
  address: CustomerAddress[];
}

export interface ReportContactDetailsProps {
  name: string;
  email: string;
  phone: string;
}

export interface AppointmentProps {
  id?: string;
  date?: string;
  leadID?: {
    id?: string;
    refID?: string;
    createdBy?: {
      fullName: string;
    };
  };
}
export interface ReportPDFProps {
  appointmentID?: AppointmentProps;
  headerDetails: ReportDocumentHeaderProps;
  contactAddress: ReportContactDetailsProps;
  movingDetails: ReportMovingDetailsProps;
  houseDetails: ReportHouseDetailsProps;
  offerDetails: OfferDetailsProps;
  serviceItem: ServiceList[];
  serviceItemFooter: ProductItemFooterProps;
}
