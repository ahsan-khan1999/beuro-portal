export interface SystemSettingDataProps {
  allowedDomains: string[];
  currency: string;
  daysLimit: number;
  isInvoiceOverDue: boolean;
  taxType: number;
}
export type Template = {
  [key: string]: {
    [key: string]: boolean;
  };
};
export type colsData = {
  title: string;
  placeholder: string;
  data: { column: string; type: string; value: boolean, text: string,textType:string };
};
export type ColumnStructure = {
  firstColumn: colsData[];
  secondColumn: colsData[];
  thirdColumn: colsData[];
  fourthColumn: colsData[];
};

export type MainColumns = {
  [key: string]: boolean;
};

export interface TemplateSettings {
  isFirstColumn: boolean;
  isFourthColumn: boolean;
  isThirdColumn: boolean;
  isSecondColumn: boolean;
  firstColumn: {
    isCompanyName: boolean;
    isEmail: boolean;
    isPhoneNumber: boolean;
    isTaxNumber: boolean;
    isWebsite: boolean;
    companyName: string;
    email: string;
    phoneNumber: string;
    taxNumber: string;
    website: string;
  };
  secondColumn: {
    isStreetNumber: boolean;
    isPostCode: boolean;
    isBankName: boolean;
    isAccountNumber: boolean;
    isIBAN: boolean;

    streetNumber: string;
    postCode: string;
    bankName: string;
    accountNumber: string;
    iban: string
  };
  thirdColumn: {
    isRow1: boolean;
    isRow2: boolean;
    isRow3: boolean;
    isRow4: boolean;
    isRow5: boolean;
    row1: string;
    row2: string;
    row3: string;
    row4: string;
    row5: string;

  };
  fourthColumn: {
    isRow1: boolean;
    isRow2: boolean;
    isRow3: boolean;
    isRow4: boolean;
    isRow5: boolean;
    row1: string;
    row2: string;
    row3: string;
    row4: string;
    row5: string;
  };
  company: string;
  createdAt: string;
  createdBy: string;
}

export interface FollowUp {
  id: string;
  createdBy: string;
  company: string;
  reason: string[];
  createdAt: string;
  isCreateFollowUpOnOfferExpire: boolean;
  isCreateFollowUpOnLeadCreation: false;
}

export interface FollowUpProp {
  isCreateFollowUpOnLeadCreation: FolowUpTypeProps;
  isCreateFollowUpOnOfferExpire: FolowUpTypeProps;
}
export interface FolowUpTypeProps {
  label: string;
  value: boolean;
}

export interface EmailSetting {
  isOwnMailConfigration: boolean;
  mailDriver: string;
  mailHost: string;
  mailPort: string;
  mailEncryption: string;
  mailUserName: string;
  mailPassword: string;
  mailFromAddress: string;
  mailFromName: string;
  testingMail: string;
  logo: string;
  email: string;
  phoneNumber: string;
  mobileNumber: string;
  FooterColour: string;
  textColour: string
}

export interface EmailTemplate {
  logo: string;
  email: string;
  phoneNumber: string;
  mobileNumber: string;
  FooterColour: string;
  textColour: string
}


export interface QRSettings {
  companyName: string;
  ibanNo: string;
  streetNumber: string;
  postalCode: string;
  city: string;
}

export interface CompanyQrSettings {
  id: string;
  createdAt: string;
  QrCodeDetail: QRSettings[]
}