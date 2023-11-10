import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";
import FormCard from "@/layout/customers/FormCard";
import React from "react";



const AddCustomerForm = ({ handleCancel }: { handleCancel: () => void }) => {
    const defaultClassName = "mt-[30px]  ";
    const { fields, onSubmit, handleSubmit, errors } = useCustomerDetail(false);

    return (
        <FormCard>
            <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
                <h2 className="text-[#393939] text-lg font-medium">Customer Details</h2>

                <BaseButton buttonText="Cancel" onClick={handleCancel} containerClassName="flex  items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full">
                </BaseButton>
            </div>
            <Form
                formFields={fields}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                className={`${defaultClassName}`}
            />
        </FormCard>
    );
};

export default AddCustomerForm;
