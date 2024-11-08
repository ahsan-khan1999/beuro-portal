import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { Customers } from "./customer";
import { User } from ".";
import { ContentTableRowTypes } from "./content";
import { globalEnums } from "@/enums/global-search";

export interface Lead {
  id: string;
  refID: string;
  customerDetail: Customers;
  lead: CustomerLeadDetail;
  leadStatus: "Open" | "InProcess" | "Close" | "Expired" | "Appointment";
  customerID: string;
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
  otherServices: string[] | ContentTableRowTypes[];
  requiredService: string | ContentTableRowTypes;
  additionalDetails: string;
  createdBy: User;
  isNoteCreated: boolean;
  isImageAdded: boolean;
  isAppointmentCreated: boolean;
  appointment: {
    id: string;
    isReportSubmitted: boolean;
  };
}

export interface LeadsFilterProps {
  [globalEnums.text]: string;
  [globalEnums.today]: string;
}
interface CustomerDetails {
  Customer: Customers;
}
export interface AddressID {
  id: string;
  address: CustomerAddress[];
}

export interface CustomerLeadDetail {
  id: string;
  name: string;
  source?: string;
  status?: string;
  expires?: string;
}
export interface CustomerAddress {
  addressType: string;
  streetNumber: string;
  country: string;
  postalCode: string;
  description: string;
  label: string;
  floor?: number;
  room?: number;
  lift?: boolean;
  parkingPermit?: boolean;
}

export interface LeadService {
  description: string;
  id: string;
  price: number;
  serviceName: string;
  unit: number;
}
