import { staticEnums } from "@/utils/static";
import { DateRangeProps, User } from ".";
import { ContentTableRowTypes } from "./content";
import { CustomerAddress, Customers } from "./customer";
import { AddressID, Lead } from "./leads";
import { OfferServiceDetails } from "./offers";

export interface contractTableTypes {
  id: string;
  contractNumber: string;
  offerID: ContractOfferDetails;
  createdAt: string;
  mail: {
    mailStatus: 0 | 1;
  };
  contractStatus: "Open" | "Confirmed" | "Cancelled";
  paymentType: string;
  title: string;
  additionalDetails: string;
  attachement?: string;
  emailStatus: string;
  signedContracts?: signedContracts[];
  isNoteCreated: boolean;
  isImageAdded: boolean;
  isTaskCreated?: boolean;
}

export interface signedContracts {
  createdAt: string;
  link: string;
  status: number;
}

export interface ContractOfferDetails {
  refID: string;
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  date: DateRangeProps[];
  time: string;
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
  discountType: keyof (typeof staticEnums)["DiscountType"];
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
  content: ContentTableRowTypes;
  serviceDetail: OfferServiceDetails;
  subTotal: number;
  total: number;
  discountAmount: number;
  discountDescription: string;
  signature?: string;
}

export interface Contract {
  title: string;
  id: string;
  additionalDetails: string;
}

export interface ContractDetailCardProps {
  contractDetails: contractTableTypes;
  offerDeleteHandler: () => void;
  handleNotes: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleImageUpload: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  handleStatusUpdate: (id: string) => void;
  handlePaymentStatusUpdate: (id: string) => void;
  handleSendEmail: () => void;
  isSendEmail: boolean;
  handleUpdateAdditionalDetailsModal: () => void;
  handleEditDateModal: () => void;
}

export interface Task {
  id: string;
  taskID: string;
  isContrcatCreated: boolean;
  title: string;
  date: {
    startDate: string;
    endDate: string;
  }[];
  isAllDay: boolean;
  colour: string;
  createdAt?: string;
  createdBy?: {
    id: string;
    fullName: string;
    company: {
      id: string;
      companyName: string;
    };
  };
  note?: string;
  alertTime?: number;
  address?: {
    streetNumber: string;
    postalCode: string;
    country: string;
  };
  type: string;
  contractID: string;
  formattedStartTime?: string;
  hasStartTime?: boolean;
  clickedStartDate?: string;
  clickedEndDate?: string;
}

export interface TaskWithSelectedDates extends Task {
  selectedStartDate?: string;
  selectedEndDate?: string;
}
