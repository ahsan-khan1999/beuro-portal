import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { PhoneProps } from "@/types";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const TelephoneInputField = ({
  country,
  name,
  setValue,
  control,
  watch,
  value,
  success,
  disabled
}: PhoneProps) => {
  // const updatedValue = watch!(name, value);
  // useEffect(() => setValue &&setValue(name, value), [])

  return (
    // <PhoneInput
    //   country={country}
    //   onChange={(value) => setValue!(name, value)}
    //   value={updatedValue}
    //   placeholder="+41 - _ _  _ _ _  _ _ _ _"
    //   containerClass="!border-2 !rounded-lg !border-lightGray !border-dark-gray focus-within:!border-primary"
    //   inputClass="!w-full !h-12 !border-0 !rounded-lg"
    // />
    <Controller
      control={control}
      name={name}
      defaultValue={value}

      render={({ field: { onChange } }) => {
        return (
          <div className="relative w-full">
            <PhoneInput
              country={country}
              onChange={(value) => onChange(value)}
              inputProps={{ name: name }}
              placeholder="+41 - _ _  _ _ _  _ _ _ _"
              value={value}
              containerClass="!border-2 !rounded-lg !border-lightGray !border-dark-gray focus-within:!border-primary "
              inputClass="!w-full !h-12 !border-0 !rounded-lg"
              onlyCountries={["ch", "de", "at", "fr", "it","pk"]}
              disabled={disabled}
            />
            {success && (
              <InputSuccessIcon className="text-middle-green absolute top-2/4 right-4 transform -translate-y-2/4" />
            )}
          </div>
        );
      }}
    />
  );
};



// const value = watch!(name, defaultValue);