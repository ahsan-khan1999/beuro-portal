import { StaticImageData } from "next/image";
import { contractTableTypes } from "./contract";
import { User } from ".";

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
  additionalDetails:string
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
}
