// export interface PDFResponse {
//   header: HeaderProps;
//   contactAddress: ContactAddressProps;
//   addressDetails: AddressDetailsProps;
//   serviceDetails: ServiceDetailProps[];
//   footer: FooterProps;
//   createdBy: CreatedByProps;
//   additionalDetails: AdditionalDetailsProps;
//   qrDetails: QRDetailsProps;
//   offerID: OfferDetails;
// }

export interface PDFResponse {
  header: HeaderProps;
  contactAddress: ContactAddressProps;
  addressDetails: AddressDetailsProps;
  serviceDetails: ServiceDetailProps[];
  footer: FooterProps;
  createdBy: CreatedByProps;
  additionalDetails: AdditionalDetailsProps;
  qrDetails: QRCodeProps;
  offerID: OfferDetails;
}


export interface QRCodeProps {
  bank: BankSideDetailsProps;
  qr: QRSideDetailsProps;
}

export interface BankSideDetailsProps {
  heading: string;
  account: string;
  ibanNumber: string;
  bankName: string;
  companyAddress: string;
  street: string;
  referenceNumber: string;
  payable: string;
  payableName: string;
  payableAddress: string;
  payableStreet: string;
  currency: string;
  amount: string;
}

export interface QRSideDetailsProps {
  heading: string;
  qrCodeImage: string;
  currency: string;
  amount: string;
}

export interface HeaderProps {
  companyLogo?: string;
  offerNumber?: string;
  offerDate?: string;
  createdBy?: CreatedByProps;
}

export interface FooterProps {
  company: CompanyDetailProps;
  createdBy: CreatedByProps;
  pages?: string;
}

export interface CreatedByProps {
  email?: string;
  fullName?: string;
}

export interface CustomerDetailProps {
  fullName?: string;
  address?: AddressProps;
}

export interface AddressProps {
  streetNumber?: string;
  country?: string;
  postalCode?: string;
  city?: string;
  houseNumber?: string;
  description?: string;
}

export interface CompanyDetailProps {
  companyName?: string;
  website?: string;
  mobileNumber?: string;
  phoneNumber?: string;
  bankDetails: BankDetailsProps;
  address: AddressProps;
  taxNumber?: string;
}

export interface ContactAddressProps {
  customerDetail: CustomerDetailProps;
  createdBy: CreatedByProps;
  company: CompanyDetailProps;
}

interface DateRangeProps {
  startDate?: string;
  endDate?: string;
}

export interface AddressDetailsProps {
  title?: string;
  addresses: AddressProps[];
  dates: DateRangeProps[];
}

export interface ServiceDetailProps {
  description?: string;
  price?: string;
  unit?: string;
  count?: string;
  total?: string;
}

export interface BankDetailsProps {
  bankName?: string;
  ibanNumber?: string;
}

export interface AdditionalDetailsProps {
  heading: string;
  description: string;
}

export interface OfferDetails {
  subTotal: string;
  taxAmount: string;
  discountAmount: string;
  discountDescription: string;
  total: string;
}

export interface ServicesTotalAmountProps {
  offerID: OfferDetails;
}
