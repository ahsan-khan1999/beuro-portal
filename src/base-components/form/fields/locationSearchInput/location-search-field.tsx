import { Controller } from "react-hook-form";
import { CustomLocationInput } from "./custom-location-search";
import { CustomLocationMainInputProps } from "@/types";

export const LocationSearchInputField = ({
  id,
  name,
  control,
  setValue,
}: CustomLocationMainInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <CustomLocationInput id={id} field={field} setValue={setValue} />
      )}
    />
  );
};
