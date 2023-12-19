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
}

export enum MailSettingsEmailTemplate {
  UPLOAD_LOGO = "UPLOAD_LOGO",
  EMAIL = "EMAIL",
  PHONE_NUMBER = "PHONE_NUMBER",
  MOBILE_NUMBER = "MOBILE_NUMBER",
  FOOTER_COLOR = "FOOTER_COLOR",
  TEXT_COLOR = "TEXT_COLOR",
}

export enum MailSettingsComponentsType {
  CONFIGURATION = "CONFIGURATION",
  EMAIL_TEMPLATE = "EMAIL_TEMPLATE",
}
