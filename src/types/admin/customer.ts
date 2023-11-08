export interface CustomerTable {
  currentPageRows: CustomersAdmin[];
}

export interface CustomerDetail {
  date?: string;
  id?: number;
  name?: string;
}

export interface CustomersAdmin {
  id: number;
  logo: string;
  companyName: string;
  customerName: string;
  email: string;
  plans: string;
  status: string;
  role: string;
  employsNumber: number;
  subscriptionDate: Date | null;
  createdOn: Date | null;
  mobileNumber: string;
  phoneNumber: string;
  addressDetails: {
    streetNo: string;
    postCode: number;
    country: string;
  };
}
export interface Address {
  streetNo: string;
  postCode: string;
  country: string;
}

export interface CustomerField {
  customerDetail?: CustomersAdmin;
}
