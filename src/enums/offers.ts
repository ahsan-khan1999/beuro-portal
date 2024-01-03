// enum for offer service edit detais
export enum ServiceOfferEditDetails {
  serviceName = "serviceName",
  price = "price",
  unit = "unit",
  count = "count",
  totalPrice = "totalPrice",
  description = "description",
  discountDiscription = "discountDiscription",
}

// Enum for edit offer details
export enum EditOfferDetails {
  selectCustomer = "customer",
  customerName = "fullName",
  email = "email",
  offerTitle = "title",
  offerNumber = "offerNumber",
  customerType = "customerType",
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  content = "content",
  streetNumber = "streetNumber",
  postCode = "postalCode",
  country = "country",
  date = "date",
}

// Additional details enum
export enum OfferAdditionalDetails {
  chooseFromExisting = "content",
  additionlData = "additionalDetails",
}

// Offers Address edit details
export enum OfferAddressEditDetails {
  streetNo = "streetNumber",
  postCode = "postalCode",
  country = "country",
  description = "description",
  address = "address",
}

// enum for add service offer details
export enum AddServiceOfferDetails {
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
}

export enum ServiceType {
  NEW_SERVICE,
  EXISTING_SERVICE,
}
