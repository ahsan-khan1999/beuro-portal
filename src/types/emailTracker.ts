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
  attachments: Pdf[];
  cc:string;
  bcc:string;

}

interface Pdf {
  href: string;
}
