// interface for the follow ups
export interface FollowUps {
  id: string;
  customerName: string;
  dateAndTime: string;
  title: string;
  status?: string;
  delete?: string;
  details?: string;
}

// follow up table is here
export interface FollowUpsTable {
  currentPageRows: FollowUps[];
  handleFollowUpsDetails: () => void;
}

// interface for all customers
export interface AllCustomers {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdOn: Date | null;
  location: string;
  type: string;
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
  handleFollowUpsDetails: () => void;
}

export interface AddPostPonedNoteProps {
  onClose: () => void;
  handleFollowUpsDetails: () => void;
}
export interface AddRemarksProps {
  onClose: () => void;
  handleFollowUpsDetails: () => void;
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
}


export interface FollowUpsTableProps {
  handleFollowUpsDetails:() => void
}


export interface AllLeadsTableProps {
  handleLeadDetail:() => void
}
export interface AllCustomersTableProps {
  handleCustomerDetail:() => void
}