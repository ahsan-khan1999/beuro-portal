import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { Customers } from "./customer";
import { User } from ".";

// Leads Table
export interface Lead {
  id: string;
  refID: string;
  customerDetail: Customers
  lead: CustomerLeadDetail;
  leadStatus: string;
  customerID:string
  images: string[];
  createdAt: string;
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
interface CustomerDetails {
  Customer: Customers
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
export interface CustomerAddress {
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

