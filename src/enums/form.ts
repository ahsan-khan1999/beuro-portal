export enum BaseFormFields {
  id = "id",
  email = "email",
  password = "password",
  confirmPassword = "confirmPassword",
  salutation = "salutation",
  fullName = "fullName",
  userName = "userName",
  dob = "dob",
  phone = "phone",
  otp = "otp",
  streetAddress = "streetAddress",
  additionalAddress = "additionalAddress",
  houseNo = "houseNumber",
  postalCode = "postalCode",
  city = "city",
  state = "state",
  country = "country",
  poBox = "poBox",
  emailAddress = "emailAddress",
}

export enum FormStages {
  PersonalDetails = "personalDetails",
  LoginAndContacts = "loginAndContactDetails",
  AddressDetails = "addressDetails",
}

export enum Salutation {
  default = "other",
  male = "Mr",
  female = "Ms",
}

export enum SalutationValue {
  "other" = 2,
  "Ms" = 1,
  "Mr" = 0,
}

export enum Field {
  input = "input",
  colorPicker = "colorPicker",
  textArea = "textArea",
  ckEditor = "ckEditor",
  customerInput = "customerInput",
  inputWithCopy = "inputWithCopy",
  creditCardNumberInput = "creditCardNumberInput",
  creditCardExpiryDateInput = "creditCardExpiryDateInput",
  password = "password",
  select = "select",
  phone = "phone",
  date = "date",
  checkbox = "checkbox",
  radio = "radio",
  dragAndDropFileField = "dragAndDropFileField",
  dragAndDropPdfField = "dragAndDropPdfField",
  profileUploadField = "profileUploadField",
  imageUploadField = "imageUploadField",
  span = "span",
  div = "div",
  button = "button",
  addField = "addField",
  link = "link",
  dateRange = "dateRange",
  multiSelect = "multiSelect",
  toggleButton = "toggleButton",
  customerSelectField = "customerSelectField",
}

export enum CardType {
  VISA = "visa",
  MASTERCARD = "mastercard",
}
