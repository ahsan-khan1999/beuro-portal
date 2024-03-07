import { StaticImageData } from "next/image";
import { contractTableTypes } from "./contract";
import { User } from ".";
import { ContentTableRowTypes } from "./content";
import { DateRangeProps } from "./form";
import { OfferServiceDetails } from "./offers";
import { AddressID } from "./leads";
import { Plan } from "./admin/plans";
import { Company } from "./company";

// Inovice table layout
export interface InvoiceTableRowTypes {
  id: string;
  invoiceNumber: string;
  paidAmount: string;
  remainingAmount: string;
  totalEmail: string;
  sentEmail: string;
  createdAt: string;
  contractID: contractTableTypes;
  invoiceTitle: string;
  totalPrice: string;
  emailStatus: string;
  invoiceStatus: string;
  isInvoiceRecurring: boolean;
  invoiceCreatedAmount: number;
  createdBy: User;
  title: string;
  isInvoiceRecurring2: boolean;
  isNoteCreated: boolean;
  customerDetail: Customers;
  total: number;
  content: ContentTableRowTypes;
}

// Inovice details table
export interface InvoiceDetailsTableRowTypes {
  id: string;
  customer: string;
  invoiceTitle: string;
  issueDate: Date | null;
  amount: string;
  emailStatus: string;
  payment: string;
  status: string;
  type?: string;
  customerDetail: Customers;
}

// Receipt details table
export interface ReceiptDetailsTableRowTypes {
  id: string;
  customer: string;
  receiptTitle: string;
  paidDate: Date | null;
  amount: string;
  invoice?: string;
  payment: string;
  emailStatus: string;
  type?: string;
  customerDetail: Customers;
}

export interface SubInvoiceTableRowTypes {
  id: string;
  amount: number;
  dateOfNextInvoice: string;
  emailStatus: "Pending" | "Sent" | "Failed";
  mail: {
    mailStatus: "open" | "failed" | "pending";
  };
  frequency: string;
  invoiceID: InvoiceTableRowTypes;
  invoiceNumber: string;
  invoiceStatus: string;
  paymentType: string;
  createdAt: string;
  isInvoiceRecurring: boolean;
  title: string;
  additionalDetails: string;
  customerDetail: Customers;
}

export interface InvoiceEmptyStateType {
  imageUrl: StaticImageData;
  imageAlt: string;
  emptyName: string;
  emptyDescription: string;
}

export interface InvoiceCardContentProps {
  handleInvoiceCreation: () => void;
  invoiceDetails: InvoiceTableRowTypes;
  handleNotes: (item: string, e?: React.MouseEvent<HTMLSpanElement>) => void;
  handleRecurringInvoiceCreation: () => void;
  handleStopInvoiceCreation: () => void;
  handleEditInvoiceFrequencyCreation: () => void;
  handleSendEmail: () => void;
  currency?: string;
  handleInvoiceEdit?: () => void;
}

export interface InvoiceDetailsTableProps {
  collectiveInvoice: SubInvoiceTableRowTypes[];
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
  handleInvoiceStatusUpdate: (id: string, status: string, type: string) => void;
  handleInvoiceEdit: (item: any) => void;
  handleRecurringInvoiceEdit: (item: any) => void;
}

export interface PdfSubInvoiceTypes {
  id: string;
  emailStatus: string;
  invoiceStatus: string;
  amount: string;
  invoiceID: InvoiceTableRowTypesPdf;
  invoiceNumber: string;
  paymentType: string;
  createdAt: string;
  title?: string;
  additionalDetails?: string;
  attachement?: string;
  createdBy: User;
  customerDetail: Customers;
}

export interface InvoiceTableRowTypesPdf {
  id: string;
  invoiceNumber: string;
  paidAmount: string;
  invoiceCreatedAmount: string;
  remainingAmount: string;
  totalEmail: string;
  sentEmail: string;
  createdAt: string;
  contractID: contractTableTypes;
  invoiceTitle: string;
  totalPrice: string;
  emailStatus: string;
  invoiceStatus: string;
  isInvoiceRecurring: boolean;
  createdBy: User;
  customerDetail: Customers;
  date: DateRangeProps[];
  time: string;
  serviceDetail: OfferServiceDetails;
  subTotal: number;
  total: number;
  addressID: AddressID;
  taxType: "Include" | "Exclude";
  taxAmount: number;
  isDiscount: boolean;
  isTax: boolean;
  discountAmount: number;
  discountDescription: string;
  discountType: 0 | 1;
  additionalDetails: string;
  content: ContentTableRowTypes;
}

export interface InvoiceDetailTableRowTypes {
  amount: number;
  id: string;
  invoiceNumber: string;
  paidAmount: string;
  remainingAmount: string;
  totalEmail: string;
  sentEmail: string;
  createdAt: string;
  contractID: contractTableTypes;
  invoiceTitle: string;
  totalPrice: string;
  emailStatus: string;
  invoiceStatus: string;
  isInvoiceRecurring: boolean;
  invoiceCreatedAmount: number;
  createdBy: User;
  title: string;
  isInvoiceRecurring2: boolean;
  isNoteCreated: boolean;
  customerDetail: Customers;
  content: ContentTableRowTypes;
  customerID: string;
  date: DateRangeProps[];
  time: string;
  serviceDetail: OfferServiceDetails;
  subTotal: number;
  total: number;
  addressID: AddressID;
  taxType: "Include" | "Exclude";
  taxAmount: number;
  isDiscount: boolean;
  isTax: boolean;
  discountAmount: number;
  discountDescription: string;
  discountType: 0 | 1;
  additionalDetails: string;
}

interface Customers {
  id: string;
  refID: string;
  createdAt: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  date: string;
  mobileNumber: string;
  gender: number;

  status?: string;
  editImg?: string;
  editNote?: string;
  customerType: string;
  companyName: string;
  mobile: string;
  address: CustomerAddress;
  edit?: boolean;
  logo: string;
  plan?: Plan;
  createdBy?: User;
}

interface CustomerAddress {
  streetNumber: string;
  country: string;
  postalCode: string;
  city?: string;
}
