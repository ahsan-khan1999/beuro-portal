import { CustomerSelectProps } from "@/types";
import { Controller } from "react-hook-form";
import { CustomerSelectBox } from "./customer-custom-select";

export const CustomerSelectField = ({
  id,
  options,
  value: defaultValue,
  control,
  name,
  trigger,
  svg,
  onItemChange,
  className,
  disabled,
  fieldIndex,
  onEnterPress,
}: CustomerSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <CustomerSelectBox
          id={id}
          svg={svg}
          onItemChange={onItemChange}
          options={options}
          value={defaultValue || ""}
          field={field}
          trigger={trigger}
          className={className}
          disabled={disabled}
          key={id}
          fieldIndex={fieldIndex}
          onEnterPress={onEnterPress}
        />
      )}
    />
  );
};
