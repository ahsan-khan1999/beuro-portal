import { SetStateAction } from "react";
import { FormField } from ".";
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

export interface CustomerTable {
    currentPageRows: Customers[]
}

export interface CustomerDetail {
    date?: string;
    id?: number;
    name?: string;
    handlePreviousClick: () => void
}
export interface CustomerLeadDetail {
    id: string;
    name: string;
    source?: string;
    status?: string;
    expires?: string;

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
    edit?: boolean;
    lead: CustomerLeadDetail
}
export interface Address {
    streetNo: string;
    postCode: string;
    country: string
}

export interface CustomerField {
    customerDetail?: Customers,
}


export interface FormDataProps {
    customerDetail: Customers,
    isUpdate: boolean,
    setIsUpdate: SetStateAction<any>;
    fields: FormField[];
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    errors?: Record<string, any>;
    onSubmit: SubmitHandler<FieldValues>;
}
