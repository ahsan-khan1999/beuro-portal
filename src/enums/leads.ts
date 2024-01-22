// Leads customer details edit
export enum LeadsCustomerEditDetails {
  name = "fullName",
  lastName = "lastName",
  companyName = "companyName",
  customerType = "customerType",
  email = "email",
  phone = "phoneNumber",
  mobile = "mobileNumber",
  streetNo = "streetNumber",
  postCode = "postalCode",
  country = "country",
  address = "address",
  type = "type",
  customer = "customerID"

}

// Leads Service edit details
export enum LeadsServiceEditDetails {
  requiredService = "requiredService",
  desireDate = "desireDate",
  contactAvailablity = "contactAvailability",
  flexibility = "flexibility",
  preferContact = "preferredContact",
  budget = "budget",
  leadSource = "leadSource",
  otherServices = "otherServices",
}

// Leads Address edit details
export enum LeadsAddressEditDetails {
  streetNo = "streetNumber",
  postCode = "postalCode",
  country = "country",
  description = "description",
  label = "label",
  type="type"
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
  additionlData = "additionalDetails",
}
