// Email-tracker
export interface TableRowEmailTracker {
  id: string;
  recipient: string;
  subject: string;

  mailStatus: "open" | "failed" | "pending";
  viewMail: {
    colorClass: string;
  };
  createdAt: string;
  viewedAt: string;
  description: string;
  email: string;
  refID: string;
  pdf: string;
  attachments: Pdf[] | string[];
  cc:string;
  bcc:string;

}

export interface Pdf {
  href: string;
}
