export interface SystemSettingDataProps {
  allowedDomains: string[];
  currency: string;
  daysLimit: number;
  isInvoiceOverDue: boolean;
  taxType: number
}
export type Template = {

  [key: string]: {
    [key: string]: boolean;
  };


};
export type colsData = {
  title: string;
  placeholder: string;
  data: { column: string, type: string, value: boolean },

};
export type ColumnStructure = {
  firstColumn: colsData[];
  secondColumn: colsData[];
  thirdColumn: colsData[];
  fourthColumn: colsData[];

}

export type MainColumns = {
  [key: string]: boolean;

}

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
  };
  secondColumn: {
    isStreetNumber: boolean;
    isPostCode: boolean;
    isBankName: boolean;
    isAccountNumber: boolean;
    isIBAN: boolean;
  };
  thirdColumn: {
    isRow1: boolean;
    isRow2: boolean;
    isRow3: boolean;
    isRow4: boolean;
    isRow5: boolean;
  };
  fourthColumn: {
    isRow1: boolean;
    isRow2: boolean;
    isRow3: boolean;
    isRow4: boolean;
    isRow5: boolean;
  };
  company: string;
  createdAt: string;
  createdBy: string
}

export interface FollowUp {
  id: string;
  createdBy: string;
  company: string;
  reason: string[];
  createdAt: string;
  isCreateFollowUpOnOfferExpire:boolean;
  isCreateFollowUpOnLeadCreation:false
}

export interface FollowUpProp {
  isCreateFollowUpOnLeadCreation: FolowUpTypeProps,
  isCreateFollowUpOnOfferExpire: FolowUpTypeProps,
}
export interface FolowUpTypeProps {
  label: string;
  value: boolean
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

}