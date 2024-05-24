// enum for add new note
export enum AddNewNote {
  noteType = "noteType",
  noteMessage = "description",
}

export enum UpdateNoteId {
  noteMessage = "description",
}

// Change password
export enum ChangePasswordField {
  oldPassword = "currentPassword",
  newPassword = "newPassword",
  confirmNewPassword = "confirmNewPassword",
}

// Add Tax
export enum AddTaxField {
  name = "name",
  taxRate = "taxRate",
}
export enum AddGeneralNoteField {
  noteType = "noteType",
  description = "description",
}

export enum AddGeneralAddressField {
  addresses = "addresses",
}

export enum EnterComponayNameField {
  companyName = "companyName",
}

// Edit payment details
export enum EditPaymentDetails {
  nameOnCard = "nameOnCard",
  expiry = "expiry",
  cardNumber = "cardNumber",
  cvv = "cvv",
}
