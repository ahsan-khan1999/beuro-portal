// Leads Table
export interface LeadsTableRowTypes {
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
