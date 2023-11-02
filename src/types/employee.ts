// Interface for the Employee table
export interface TRowEmployees {
  id: string;
  name: string;
  email: string;
  phone: number;
  designation: string;
  createdOn: Date | null;
  action: "edit";
  handlePasswordReset: Function;
  
}
export interface EmployeeDetail {
  date?: Date | null;
  id?: string;
  name?: string;
}
