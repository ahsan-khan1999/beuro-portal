// Inovice table layout
export interface InvoiceTableRowTypes {
  id: string;
  customer: string;
  invoiceTitle: string;
  totalPrice: string;
  emailStatus: string;
  paid: {
    initialValue: string;
    finalValue: string;
  };
  status: string;
  editNote?: string;
  type?: string;
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
