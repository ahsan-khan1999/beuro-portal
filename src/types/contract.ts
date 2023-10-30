// Interface for contract Table
export interface contractTableTypes {
  id: string;
  customer: string;
  contractTitle: string;
  totalPrice: string;
  createdOn: Date | null;
  payment?: string;
  status?: string;
  editImg?: string;
  editNote?: string;
  type?: string;
}
