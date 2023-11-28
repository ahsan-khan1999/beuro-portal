import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { Customers } from "./customer";
import { User } from ".";

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
  customerID: Customers
  type: string;
  addressID: AddressID;
  stage: ComponentsType;
  desireDate: string;
  contactAvailability: string;
  flexibility: string;
  preferredContact: string;
  budget: string;
  leadSource: string;
  otherServices: string[];
  requiredService: string;
  additionalDetails: string;
  createdBy: User
}

export interface AddressID {
  id: string,
  address: CustomerAddress[]
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
  postalCode: string;
  description: string
}


export interface LeadService {
  description: string;
  id: string;
  price: number
  serviceName: string;
  unit: number
}

