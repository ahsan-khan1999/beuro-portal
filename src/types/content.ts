import { ComponentsType } from "@/enums/content";
import {
  DocumentDetailFooterProps,
  DocumentHeaderDetailsProps,
  TemplateType,
  User,
} from ".";
import { EmailTemplate } from "./settings";
import { SystemSetting } from "@/api/slices/settingSlice/settings";

export interface ContentTableRowTypes {
  refID: string;
  createdAt: string;
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
  stage: ComponentsType;
  createdBy: User;
}

export interface ContentPdfPageProps {
  headerDetails?: DocumentHeaderDetailsProps;
  footerDetails?: DocumentDetailFooterProps;
  aggrementDetails?: string;
  templateSettings: TemplateType | null;
  totalPages?: number;
  currPage?: number;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings: SystemSetting | null;
}
