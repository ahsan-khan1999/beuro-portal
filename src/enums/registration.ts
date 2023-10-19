export enum RegisterationFields {
  email = "email",
  password = "password",
  confirmPassword = "confirmPassword",
}

export enum PersonalDetailsFields {
  salutation = "salutation",
  fullName = "fullName",
  userName = "username",
  dateOfBirth = "dob",
}

export enum loginAndContactDetailsFields {
  email = "email",
  phone = "phoneNumber",
  otp = "otp",
  password = "password",
}

export enum addressDetailsFields {
  street = "streetAddress",
  houseNo = "houseNumber",
  postalCode = "postCode",
  town = "city",
  country = "country",
  state = "state",
}
export enum ResetPasswordFields {
  email = "email",
}

export enum ChangePasswordFields {
  password = "password",
  confirmPassword = "confirmPassword",
  currentPassword = "currentPassword",
  newPassword = "newPassword",
}

// Employee password reset
export enum employeePasswordResetFields {
  yourPassword = "yourPassword",
  newPassword = "newPassword",
  confirmNewPassword = "confirmNewPassword",
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
