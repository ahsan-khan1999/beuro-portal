// Leads Table
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdOn: Date | null;
  location: string;
  status?: string;
  editImg?: string;
  editNote?: string;
  type?: string;
}
