// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { PhoneProps } from "@/types";
import { combineClasses } from "@/utils/utility";
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
  disabled,
  className,
}: PhoneProps) => {
  const classes = combineClasses(
    "!w-full !h-[48px] !border-0 !rounded-lg",
    className
  );
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      render={({ field: { onChange } }) => {
        return (
          <div className="relative w-full">
            <PhoneInput
              country={country}
              onChange={(value) => {
                const numberWithPlus = "+" + value;
                onChange(numberWithPlus);
              }}
              countryCodeEditable={true}
              enableAreaCodeStretch={false}
              inputProps={{ name: name }}
              placeholder="+41 - _ _  _ _ _  _ _ _ _"
              value={value}
              containerClass="!border !rounded-lg !border-lightGray focus-within:!border-primary "
              inputClass={classes}
              onlyCountries={["ch", "de", "at", "fr", "it", "pk"]}
              disabled={disabled}
            />
            {/* {success && (
              <InputSuccessIcon className="text-middle-green absolute top-2/4 right-4 transform -translate-y-2/4" />
            )} */}
          </div>
        );
      }}
    />
  );
};

// const value = watch!(name, defaultValue);
