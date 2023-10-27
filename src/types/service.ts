// Interface for the services table
export interface TRowServices {
  id: string;
  service: string;
  createdOn: Date | null;
  price: {
    value: number;
    currency: string;
  };
  description: string;
  action: "edit";
}
