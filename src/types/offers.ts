// types for offers
export interface OffersTableRowTypes {
  id: string;
  customer: string;
  offerTitle: string;
  totalPrice: string;
  createdOn: Date | null;
  email?: string;
  payment?: string;
  status?: string;
  editImg?: string;
  editNote?: string;
  type?: string;
}
