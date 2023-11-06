// Interface for the content table
export interface ContentTableRowTypes {
  id: string;
  name: string;
  contentTitle: string;
  createdOn: Date | null;
  edit?: string;
  offer: {
    name: string;
    addressLabels: string;
    title: string;
    description: string;
    emailBody: string;
    attachmentName: string;
  };
  confirmation: {
    title: string;
    description: string;
    emailBody: string;
    attachmentName: string;
  };
  invoice: {
    title: string;
    description: string;
    emailBody: string;
    attachmentName: string;
  };
  receipt: {
    title: string;
    description: string;
    emailBody: string;
    attachmentName: string;
  };
}
