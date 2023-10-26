
export interface CustomerTable {
    currentPageRows: Customers[]
}

export interface CustomerDetail {
    date?: string;
    id?: number;
    name?: string
}

export interface Customers {
    id: number;
    name: string;
    email: string;
    phone: string;
    date: string;
    location: string;
    status?: string;
    editImg?: string;
    editNote?: string;
    customerType?: string;
    companyName: string;
    mobile: string;
    address: Address;
    edit?:boolean
}
export interface Address {
    street: string;
    postCode: string;
    country: string
}

export interface CustomerField {
    customerDetail?: Customers,
  }