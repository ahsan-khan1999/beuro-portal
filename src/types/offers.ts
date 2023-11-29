import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { CustomerAddress, Customers } from "./customer";
import { AddressID, Lead } from "./leads";
import { DateRangeProps, User } from ".";
import { ContentTableRowTypes } from "./content";

// types for offers
export interface OffersTableRowTypes {
  id: string;
  refID: string;
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
  customerID: Customers
  type: string;
  addressID: AddressID;
  stage: ComponentsType;
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
  discountType: DiscountType;
  emailStatus: "Pening" | "Sent" | "Post";
  isDiscount: boolean;
  isTax: boolean;
  offerNumber: string;
  offerStatus: "Open" | "Signed" | "Expired" | "Rejected";
  paymentType: "Cash" | "Online";
  taxType: "Include" | "Exclude";
  title: string;
  totalPrice: number;
  leadID:Lead;
  content?:ContentTableRowTypes
}


export interface EmailStatus {
  Pending: number,
  Sent: number,
  Post: number
}
export interface TaxType {
  Include: number,
  Exclude: number,
}
export interface DiscountType {
  Percent: number,
  Amount: number,
}
export interface PaymentType {
  Cash: number,
  Online: number,
}
export interface OfferStatus {
  Open: number,
  Signed: number,
  Expired: number,
  Rejected: number
}