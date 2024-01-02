import { number } from "yup";

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

export interface SelectMonthProps {
  handleSelectMonth: () => void;
}

export interface GetYearAndMonth {
  year: number;
  month: string;
}

export interface MonthSelectModalProps {
  onClose: () => void;
  handleDownload: (date: GetYearAndMonth) => void;
}
