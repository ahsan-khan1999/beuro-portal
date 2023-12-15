import { StaticImageData } from "next/image";
import { contractTableTypes } from "./contract";

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
  emailStatus: string;
  frequency: string;
  invoiceID: InvoiceTableRowTypes;
  invoiceNumber: string;
  invoiceStatus: string;
  paymentType: string;
  createdAt: string;
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
}

export interface InvoiceDetailsTableProps {
  collectiveInvoice: SubInvoiceTableRowTypes[];
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
  handleInvoiceStatusUpdate: (id: string, status: string, type: string) => void;
  handleInvoiceEdit: (item: any) => void;
}
