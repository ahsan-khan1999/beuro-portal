import { contractTableTypes } from "./contract";

// Inovice table layout
export interface InvoiceTableRowTypes {
  id: string;
  invoiceNumber:string;
  paidAmount:string;
  remainingAmount:string;
  totalEmail:string;
  sentEmail:string;
  createdAt:string;
  contractID:contractTableTypes;
  invoiceTitle: string;
  totalPrice: string;
  emailStatus: string;
  invoiceStatus: string;
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
  amount:number;
  dateOfNextInvoice:string;
  emailStatus: string;
  frequency:string;
  invoiceID:InvoiceTableRowTypes
  invoiceNumber:string;
  invoiceStatus: string;
  paymentType:string;
  createdAt:string;

}