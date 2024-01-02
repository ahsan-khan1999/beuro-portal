import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";
import { User } from ".";

// Interface for the content table
export interface ContentTableRowTypes {
  refID: string;
  createdAt:string;
  id: string;
  contentName: string;
  contentTitle: string;
  createdOn: string;
  offerContent: {
    name: string;
    address: string[];
    title: string;
    description: string;
    body: string;
    attachments: string[];
  };
  confirmationContent: {
    title: string;
    description: string;
    body: string;
    attachments: string[];
  };
  invoiceContent: {
    title: string;
    description: string;
    body: string;
    attachments: string[];
  };
  receiptContent: {
    title: string;
    description: string;
    body: string;
    attachments: string[];

  };
  stage: ComponentsType,
  createdBy:User
}
