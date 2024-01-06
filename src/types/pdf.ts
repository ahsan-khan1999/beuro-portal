export interface PDFResponse {
  header: HeaderProps;
  contactAddress: ContactAddressProps;
  addressDetails: AddressDetailsProps;
  serviceDetails: ServiceDetailProps[];
}
export interface HeaderProps {
  companyLogo: string;
  offerNumber: string;
  offerDate: string;
  createdBy: string;
}

export interface CreatedByProps {
  email: string;
}

export interface CustomerDetailProps {
  fullName: string;
  address: AddressProps;
}

export interface AddressProps {
  streetNumber: string;
  country: string;
  postalCode: string;
  description?: string;
}

export interface CompanyDetailProps {
  phoneNumber: string;
}

export interface ContactAddressProps {
  customerDetail: CustomerDetailProps;
  createdBy: CreatedByProps;
  company: CompanyDetailProps;
}

interface DateRangeProps {
  startDate: string;
  endDate: string;
}

export interface AddressDetailsProps {
  title: string;
  addresses: AddressProps[];
  dates: DateRangeProps[];
}

export interface ServiceDetailProps {
  description: string;
  price: string;
  unit: string;
  count: string;
  total: string;
}
