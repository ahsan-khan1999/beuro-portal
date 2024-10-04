import { RemainderSeclectionFieldProps } from "@/types";
import { Controller } from "react-hook-form";
import { CustomColorSelectionField } from "./custom-remainder-selector";

export const RemainderSelectField = ({
  id,
  options,
  value: defaultValue,
  control,
  name,
  trigger,
  containerClassName,
}: RemainderSeclectionFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <CustomColorSelectionField
          id={id}
          options={options}
          value={field.value || ""}
          trigger={trigger}
          containerClassName={containerClassName}
          name={name}
          onChange={field.onChange}
        />
      )}
    />
  );
};
