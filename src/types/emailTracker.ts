// Email-tracker
export interface TableRowEmailTracker {
  id: string;
  recipient: string;
  subject: string;


  mailStatus: string
  viewMail: {
    colorClass: string;
  };
  createdAt: string;
  viewedAt: string;
  description: string;
  email: string;
  refID: string;
  pdf: Pdf[]
}

interface Pdf {
  href: string
}