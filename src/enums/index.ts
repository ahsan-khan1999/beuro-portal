export const enum Fields {
  email = "email",
  password = "password",
  description = "description",
}
export enum CustomerDetailsFields {
  Name = "Name",
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

// export * from './registration';
// export * from './form';
// export * from './userAccount';
// export * from './myBuying';
// export * from './mySellings';
