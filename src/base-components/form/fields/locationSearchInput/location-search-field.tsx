import { Controller } from "react-hook-form";
import { CustomLocationInput } from "./custom-location-search";

export const LocationSearchInputField = ({
  id,
  name,
  control,
  setValue,
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue="" // Set default value to empty string
      render={({ field }) => (
        <CustomLocationInput
          id={id}
          field={field} // Pass the form field from RHF
          setValue={setValue} // Pass RHF's setValue to update the form state
        />
      )}
    />
  );
};
