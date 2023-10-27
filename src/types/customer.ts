// customer Table
export interface CustomerTableRowTypes {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdOn: Date | null;
  location: string;
  edit?: string;
  type?: string;
}
