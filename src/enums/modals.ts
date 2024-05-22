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
  TITTLE = "TITTLE",
  DESCRIPTION = "DESCRIPTION",
}

export enum AddGeneralAddressField {
  TITTLE = "TITTLE",
}

// Edit payment details
export enum EditPaymentDetails {
  nameOnCard = "nameOnCard",
  expiry = "expiry",
  cardNumber = "cardNumber",
  cvv = "cvv",
}
