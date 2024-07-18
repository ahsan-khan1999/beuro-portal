export interface Appointments {
  id: string;
  lead_id: string;
  customer: string;
  date: string;
  time: string;
  agent: {
    profile_img: string;
    name: string;
  };
  appointmentsStatus: "Pending" | "Completed" | "Cancelled";
}
