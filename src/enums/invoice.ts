// enum for created invoice
export enum createInvoice {
  totalAmount = "amount",
  remainingAmount = "remainingAmount",
  paymentMethod = "paymentType",
  date = "dateOfNextInvoice",
  frequency = "frequency",
  isInvoiceRecurring = "isInvoiceRecurring",
}

export enum ComponentsType {
  customerAdded,
  addressAdded,
  serviceAdded,
  additionalAdded,
  additionalAddedSucces,
}

export enum EditComponentsType {
  offerEdit,
  addressEdit,
  serviceEdit,
  additionalEdit,
}

export enum CreateInvoiceAddressDetails {
  streetNo = "streetNumber",
  postCode = "postalCode",
  country = "country",
  description = "description",
  address = "address",
  label = "label",
  type = "type",
}

export enum CreateInvoiceServiceOfferDetails {
  serviceType = "serviceType",
  serviceTitle = "serviceTitle",
  price = "price",
  count = "count",
  unit = "unit",
  totalPrice = "totalPrice",
  description = "description",
  discountDiscription = "discountDescription",
  discountType = "discountType",
  isDiscount = "isDiscount",
  discountAmount = "discountAmount",
  isTax = "isTax",
  taxType = "taxType",
  taxAmount = "taxAmount",
  discount = "discount",
}

export enum CreateInvoiceAdditionalDetails {
  chooseFromExisting = "content",
  additionlData = "additionalDetails",
}
