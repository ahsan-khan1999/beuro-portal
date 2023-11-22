import { Customers } from "./customer";

// Leads Table
export interface Lead {
  id: string;
  refID: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  date: string;
  mobileNumber: string;
  status: string;
  editImg?: string;
  editNote?: string;
  customerType?: string;
  companyName: string;
  mobile: string;
  address: CustomerAddress;
  edit?: boolean;
  lead: CustomerLeadDetail;
  leadStatus: string;
  images: string[];
  createdAt: string;
  customerID:Customers
  type:string
}

export interface CustomerLeadDetail {
  id: string;
  name: string;
  source?: string;
  status?: string;
  expires?: string;
}
interface CustomerAddress {
  streetNumber: string;
  country: string;
  postalCode: string
}
