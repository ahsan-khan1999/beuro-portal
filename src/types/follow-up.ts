import { StatusColors } from "@/enums/follow-up";
import { CustomerAddress, CustomerLeadDetail } from "./customer";
import { Lead } from "./leads";

// interface for the follow ups
export interface FollowUps {
  id: string;
  dateAndTime: string;
  title: string;
  status:  keyof typeof StatusColors;
  delete?: string;
  details?: string;
  dateTime: string
  customer: AllCustomers;
  lead:Lead;
  additionalDetails:string;
  isCompleted:boolean;
  isPostponed:boolean;
  postPonedNote:string;
  completeRemarks:string
  createdAt:string;
  refID:string
}

// follow up table is here
export interface FollowUpsTable {
  currentPageRows: FollowUps[];
  handleFollowUpsDetails: (id:string) => void;
  handleFollowUpsDelete: (id:string) => void;

}

// interface for all customers
export interface AllCustomers {
  id: number;
  refID: string;
  createdAt: string
  fullName: string;
  email: string;
  phoneNumber: string;
  date: string;
  mobileNumber: string;

  status?: string;
  editImg?: string;
  editNote?: string;
  customerType: string;
  companyName: string;
  mobile: string;
  address: CustomerAddress;
  edit?: boolean;
  lead: CustomerLeadDetail;

}

export interface AllCustomersTable {
  currentPageRows: AllCustomers[];
  handleCustomerDetail: () => void;
}

// interface for all the leads
export interface AllLeads {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  desireDate: Date | null;
  location: string;
  status?: string;
}

export interface AllLeadsTable {
  currentPageRows: AllLeads[];
  handleLeadDetail: () => void;
}

export interface AddFollowUpProps {
  onClose: () => void;
  handleFollowUps: () => void;
  handleAllCustomers: () => void;
  handleAllLeads: () => void;
}

export interface AllCustomersProps {
  onClose: () => void;
  handleCustomerDetail: () => void;
}

// Follow up service details
export interface FollowUpServicesDetailsProps {
  onClose: () => void;
}

// Follow up customers details
export interface FollowUpCustomersDetailsProps {
  onClose: () => void;
}

export interface FollowUpsProps {
  onClose: () => void;
  handleFollowUpsDetails: (id:string) => void;
}

export interface AddPostPonedNoteProps {
  onClose: () => void;
  handleFollowUpsDetails: (id:string) => void;
}
export interface AddRemarksProps {
  onClose: () => void;
  handleFollowUpsDetails: (id:string) => void;
}

export interface AllLeadsProps {
  onClose: () => void;
  handleLeadDetail: () => void;
}

export interface FollowUpDetailsProps {
  onClose: () => void;
  handleAddPostPonedNote: () => void;
  handleAddRemarks: () => void;
  status: {
    postpond: boolean;
    completed: boolean;
    neutral: boolean;
  };
  followUpDetails:FollowUps
}


export interface FollowUpsTableProps {
  handleFollowUpsDetails: (id:string) => void
}


export interface AllLeadsTableProps {
  handleLeadDetail: () => void
}
export interface AllCustomersTableProps {
  handleCustomerDetail: () => void
}