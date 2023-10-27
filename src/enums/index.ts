export const enum Fields {
  email = "email",
  password = "password",
  description = "description",
}


export enum CustomerDetailsFields {
  firstName = "firstName",
  lastName = "lastName",
  companyName = "companyName",
  customerType = "customerType",
  email = "email",
  phone = "phone",
  mobile = "mobile",
  streetNo = "streetNo",
  postCode = "postCode",
  country = "country",
}

// Services detail enum
export enum ServicesDetailFields {
  serviceTitle = "serviceTitle",
  unit = "unit",
  price = "price",
  description = "description",
}

// contact-support enum
export enum ContactSupportFields {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  mobileNumber = "mobileNumber",
  reasonForContact = "reasonForContact",
  message = "message",
}

// Employ details enum
export enum EmployDetailsFields {
  employName = "employName",
  designation = "designation",
  email = "email",
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
}

// Leads customer details edit
export enum LeadsCustomerEditDetails {
  firstName = "firstName",
  lastName = "lastName",
  customerType = "customerType",
  email = "email",
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  streetNo = "streetNo",
  postCode = "postCode",
  country = "country",
}

// Leads Address edit details
export enum LeadsAddressEditDetails {
  streetNo = "streetNo",
  postCode = "postCode",
  country = "country",
  description = "description",
}

// Leads Service edit details
export enum LeadsServiceEditDetails {
  requiredService = "requiredService",
  desireDate = "desireDate",
  contactAvailablity = "contactAvailablity",
  flexibility = "flexibility",
  preferContact = "preferContact",
  budget = "budget",
  leadSource = "leadSource",
  otherServices = "otherServices",
}

// Add new customer lead details
export enum AddNewLeadCustomer {
  customer = "customer",
  customerType = "customerType",
  yourName = "yourName",
  companyName = "companyName",
  email = "email",
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  streetNumber = "streetNumber",
  postCode = "postCode",
  country = "country",
}

// Additional details enum
export enum LeadAdditionalDetails {
  additionlData = "additionlData",
}

// contract email preview
export enum ContractEmailPreview {
  email = "email",
  content = "content",
  subject = "subject",
  description = "descritpion",
  fileUpload = "fileUpload",
}

// enum for add new note
export enum AddNewNote {
  noteMessage = "noteMessage",
}

// Enum for edit offer details
export enum EditOfferDetails {
  selectCustomer = "selectCustomer",
  customerName = "customerName",
  email = "email",
  offerTitle = "offerTitle",
  offerNumber = "offerNumber",
  customerType = "customerType",
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  streetNumber = "streetNumber",
  postCode = "postCode",
  country = "country",
  date = "date",
}

// Additional details enum
export enum OfferAdditionalDetails {
  chooseFromExisting = "chooseFromExisting",
  additionlData = "additionlData",
}

// Employee password reset
export enum employeePasswordResetFields {
  yourPassword = "yourPassword",
  newPassword = "newPassword",
  confirmNewPassword = "confirmNewPassword",
}

// Change password
export enum ChangePasswordField {
  oldPassword = "oldPassword",
  newPassword = "newPassword",
  confirmNewPassword = "confirmNewPassword",
}
// Add Tax
export enum AddTaxField {
  name = "name",
  taxRate = "taxRate",
}

// Employee password reset
export enum createEMployeeNewPasswordFields {
  newPassword = "newPassword",
  confirmNewPassword = "confirmNewPassword",
}

// enum for created invoice
export enum createInvoice {
  totalAmount = "totalAmount",
  remainingAmount = "remainingAmount",
  enterAmount = "enterAmount",
  paymentMethod = "paymentMethod",
  markItRecuring = "markItRecuring",
  date = "date",
  frequency = "frequency",
}

// Leads Address edit details
export enum OfferAddressEditDetails {
  streetNo = "streetNo",
  postCode = "postCode",
  country = "country",
  description = "description",
}

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

// enum for add service offer details
export enum AddServiceOfferDetails {
  serviceType = "serviceType",
  serviceTitle = "serviceTitle",
  price = "price",
  count = "count",
  unit = "unit",
  totalPrice = "totalPrice",
  description = "description",
  discountDiscription = "discountDiscription",
}


// export * from './registration';
// export * from './form';
// export * from './userAccount';
// export * from './myBuying';
// export * from './mySellings';
