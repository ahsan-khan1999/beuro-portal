import { Controller } from "react-hook-form";
import { DateRangeValueProps, MultiDateProps, PhoneProps } from "@/types";
//@ts-expect-error
import { DateRange } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


export const MultiDateField = ({
    name,
    control,
    value,
    disabled,
    remove,
    onRemove
}: MultiDateProps) => {
    return (

        <Controller
            control={control}
            name={name}
            defaultValue={value}

            render={({ field: { onChange: handleChange, value } }) => {
                return (
                    <div className="relative w-full">
                        {
                            remove &&
                            <div className="cursor-pointer -top-9 absolute left-80 bg-red px-3 py-1 mt-1 text-white rounded-t-md" onClick={onRemove}>
                                {remove}
                            </div>
                        }
                        <DateRange
                            ranges={[{
                                startDate: value?.startDate,
                                endDate: value?.endDate,
                                key: 'selection',
                            }] ||{
                                startDate: new Date(),
                                endDate: new Date(),
                                key: 'selection',
                            } }
                            onChange={(val: DateRangeValueProps) => {
                                let { selection } = val
                                handleChange({
                                    startDate: selection.startDate,
                                    endDate: selection.endDate,

                                })

                            }}
                            moveRangeOnFirstSelection={false}
                        />

                    </div>
                );
            }}
        />
    );
};


