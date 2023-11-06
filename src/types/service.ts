// Interface for the services table
export interface TRowServices {
  id: string;
  service: string;
  unit?: string;
  createdBy?: string;
  createdOn: Date | null;
  price: {
    value: number;
    currency: string;
  };
  description: string;
  action: "edit";
}
