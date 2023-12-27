import { DateRangeProps, User } from ".";
import { ContentTableRowTypes } from "./content";
import { CustomerAddress, Customers } from "./customer";
import { AddressID, Lead } from "./leads";
import { OfferServiceDetails } from "./offers";

// Interface for contract Table
export interface contractTableTypes {
  id: string;
  contractNumber: string;
  offerID: ContractOfferDetails;
  createdAt: string;
  contractStatus: "Open" | "Confirmed" | "Cancelled";
  paymentType:string
}
export interface ContractOfferDetails {
  refID: string;
  id: string;

  fullName: string;
  email: string;
  phoneNumber: string;
  date: DateRangeProps[];
  mobileNumber: string;
  status: string;
  editImg?: string;
  editNote?: string;
  customerType?: string;
  companyName: string;
  mobile: string;
  address: CustomerAddress;
  edit?: boolean;
  leadStatus: string;
  images: string[];
  createdAt: string;
  customerID: Customers;
  type: string;
  addressID: AddressID;
  desireDate: string;
  contactAvailability: string;
  flexibility: string;
  preferredContact: string;
  budget: string;
  leadSource: string;
  otherServices: string[];
  requiredService: string;
  additionalDetails: string;
  createdBy: User;
  discountType: 0 | 1;
  emailStatus: "Pening" | "Sent" | "Post";
  isDiscount: boolean;
  isTax: boolean;
  offerNumber: string;
  contractStatus: "Open" | "Confirmed" | "Cancelled";
  offerStatus: "Open" | "Signed" | "Expired" | "Rejected";

  paymentType: "Cash" | "Online";
  taxType: "Include" | "Exclude";
  taxAmount: number;
  title: string;
  totalPrice: number;
  leadID: Lead;
  content?: ContentTableRowTypes;
  serviceDetail: OfferServiceDetails;
  subTotal: number;
  total: number;
  discountAmount: number;
  discountDescription: string;
}

export interface ContractDetailCardProps {
  contractDetails: contractTableTypes;
  offerDeleteHandler: () => void;
  handleNotes: (item: string, e: React.MouseEvent<HTMLSpanElement>) => void;
  handleImageUpload: (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleStatusUpdate: (id: string) => void;
  handlePaymentStatusUpdate: (id: string) => void;
  handleSendEmail: () => void
}
