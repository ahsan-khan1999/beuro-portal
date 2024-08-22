import { ColourSeclectionFieldProps } from "@/types";
import { Controller } from "react-hook-form";
import { CustomColorSelectionField } from "./custom-colour-selector";

export const ColourSelectField = ({
  id,
  options,
  value: defaultValue,
  control,
  name,
  trigger,
  containerClassName,
}: ColourSeclectionFieldProps) => {
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
