// Email-tracker
export interface TableRowEmailTracker {
  id: string;
  recipient: string;
  subject: string;


  status: "Open" | "Pending"
  viewMail: {
    colorClass: string;
  };
  createdAt: string;
  viewedAt: string;
  description: string;
  email:string
}
