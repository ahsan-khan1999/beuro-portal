import { Customers } from "../customer";
import { Employee } from "../employee";
import { Plan } from "./plans";

export interface CustomerTable {
  currentPageRows: CustomersAdmin[];
}

export interface CustomerDetail {
  date?: string;
  id?: number;
  name?: string;
}

export interface CustomersAdmin {
  id: string;
  email: string;
  status: string;
  role: string;
  employee: Employee;
  createdAt: string;
  company: Customers;
  fullName: string;
  isProfileComplete: boolean;
  isEmailVerified: boolean;
  refID: string;
  plan: Plan;
}
export interface Address {
  streetNo: string;
  postCode: string;
  country: string;
}

export interface CustomerField {
  customerDetail?: CustomersAdmin;
}
