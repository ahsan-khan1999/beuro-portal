import { Controller } from "react-hook-form";
import { AgentSelectBox } from "./agent-custom-select";
import { AgentSelectProps } from "@/types";

export const AgentSelectField = ({
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
}: AgentSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <AgentSelectBox
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
