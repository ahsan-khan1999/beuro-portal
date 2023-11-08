export interface PaymentsAdmin {
  id: number;
  companyName: string;
  ownerName: string;
  plans: string;
  pricing: string;
  payments: string;
  subscriptionAt: Date | null;
  status: string;
}
