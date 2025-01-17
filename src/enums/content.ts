export enum LeadContentDetails {
  leadTitle = "title",
  emailBody = "body",
  attachments = "attachments",
}

// offer edit content enum
export enum OfferEditContentDetails {
  contentName = "contentName",
  addressLabel = "address",
  offerTitle = "title",
  offerDescription = "description",
  emailBody = "body",
  attachments = "attachments",
  address = "address",
}

// enum for confirmation edit content details
export enum EditConfirmationContentDetails {
  confirmationTitle = "title",
  confirmationDescription = "description",
  emailBody = "body",
  attachments = "attachments",
}

// enum for Invoice edit content details
export enum EditInvoiceContentDetails {
  invoiceTitle = "title",
  invoiceDescription = "description",
  emailBody = "body",
  attachments = "attachments",
}
// enum for Receipt edit content details
export enum ReceiptEditContentDetails {
  receiptTitle = "title",
  receiptDescription = "description",
  emailBody = "body",
  attachments = "attachments",
}

export enum ContentPDFComponents {
  OFFER_CONTENT_PDF = "OFFER_CONTENT_PDF",
  CONFIRMATION_CONTENT_PDF = "CONFIRMATION_CONTENT_PDF",
  INVOICE_CONTENT_PDF = "INVOICE_CONTENT_PDF",
  RECEIPT_CONTENT_PDF = "RECEIPT_CONTENT_PDF",
}

export enum ComponentsType {
  addLeadContent,
  addOffer,
  addConfirmationContent,
  addInvoiceContent,
  addReceiptContent,
}
