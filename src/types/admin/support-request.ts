export interface SupportRequestAdmin {
  id: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  requestDate: Date | null;
  status: string;
  name: string;
  companyName: string;
  mobileNumber: string;
  contractReason: string;
  message: string;
}
