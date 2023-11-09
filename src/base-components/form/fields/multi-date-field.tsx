import { Controller } from "react-hook-form";
import { MultiDateProps, PhoneProps } from "@/types";
//@ts-expect-error
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MultiDateField = ({
    name,
    control,
    value,
    disabled
}: MultiDateProps) => {
    console.log(value,"value");
    
    return (

        <Controller
            control={control}
            name={name}
            defaultValue={value}

            render={({ field: { onChange } }) => {
                return (
                    <div className="relative w-full">
                        <DatePicker
                            onChange={(date: string) => {
                                onChange(date)
                                console.log(value, "value");


                            }}
                            inputProps={{ name: name }}
                            startDate={value}
                            endDate={value}
                            class="!border-2 !rounded-lg !border-lightGray !border-dark-gray focus-within:!border-primary "
                            inputClass="!w-full !h-12 !border-0 !rounded-lg"
                            disabled={disabled}
                            selectsRange={true}
                        />

                    </div>
                );
            }}
        />
    );
};



// const value = watch!(name, defaultValue);