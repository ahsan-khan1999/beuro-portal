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
}
