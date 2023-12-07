// Email-tracker
export interface TableRowEmailTracker {
  id: number;
  recipient: string;
  subject: string;
  sendAt: {
    time: string;
    date: string;
  };
  viewedAt: {
    time: string;
    date: string;
  };
  status: {
    text: string;
    colorClass: string;
  };
  viewMail: {
    colorClass: string;
  };
}
