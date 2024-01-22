// Change mail setting
export enum ChangeMailSetting {
  mailDriver = "mailDriver",
  mailHost = "mailHost",
  mailPort = "mailPort",
  mailEncryption = "mailEncryption",
  mailUsername = "mailUserName",
  mailPassword = "mailPassword",
  mailFormAddress = "mailFromAddress",
  mailFormName = "mailFromName",
  mail = "testingMail",
  isOwnMailConfigration = "isOwnMailConfigration",
}

// enum for add reason
export enum AddReason {
  addReason = "reason",
}

// setting profile enum
export enum SettingProfile {
  fullName = "fullName",
  companyName = "companyName",
  phoneNumber = "phoneNumber",
  mobileNumber = "mobileNumber",
  website = "website",
  mwstNumber = "taxNumber",
  streetAddress = "streetNumber",
  houseAddress = "houseNumber",
  postCode = "postalCode",
  country = "country",
  city = "city",
  bankName = "bankName",
  accountNumber = "accountNumber",
  IBAN_number = "ibanNumber",
  changePassword = "changePassword",
  email="email"
}

export enum MailSettingsEmailTemplate {
  UPLOAD_LOGO = "logo",
  EMAIL = "email",
  PHONE_NUMBER = "phoneNumber",
  MOBILE_NUMBER = "mobileNumber",
  FOOTER_COLOR = "FooterColour",
  TEXT_COLOR = "textColour",
}

export enum MailSettingsComponentsType {
  CONFIGURATION = "CONFIGURATION",
  EMAIL_TEMPLATE = "EMAIL_TEMPLATE",
}
