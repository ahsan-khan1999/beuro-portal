import { MultiSelectProps, SelectProps } from "@/types";
import { Controller } from "react-hook-form";
import { MultiSelectBox } from "./custom-multi-select";

export const MultiSelectField = ({
  id,
  options,
  value: defaultValue,
  control,
  name,
  trigger,
  svg,
  onItemChange,
  className,
  disabled
}: MultiSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <MultiSelectBox
          id={id}
          svg={svg}
          onItemChange={onItemChange}
          options={options}
          value={defaultValue}
          field={field}
          trigger={trigger}
          className={className}
          disabled={disabled}
          key={id}
        />
      )}
    />
  );
};
