import { SelectProps } from "@/types";
import { Controller } from "react-hook-form";
import { SelectBox } from "./custom-select";

export const SelectField = ({
  id,
  options,
  value: defaultValue,
  control,
  name,
  trigger,
  className,
  disabled
}: SelectProps) => {
  console.log(defaultValue,"defaultValue");
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <SelectBox
          id={id}
          options={options}
          value={defaultValue}
          field={field}
          trigger={trigger}
          className={className}
          disabled={disabled}
        />
      )}
    />
  );
};
