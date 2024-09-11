import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { CustomLocationInputProps } from "@/types";
import { useEffect, useState } from "react";

export const CustomLocationInput = ({
  id,
  field,
  setValue,
}: CustomLocationInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue: setAutocompleteValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["address"],
    },
    debounce: 300,
  });

  useEffect(() => {
    if (field.value) {
      setInputValue(field.value);
      setAutocompleteValue(field.value);
    }
  }, [field.value, setAutocompleteValue]);

  const handleSelect = async (description: string) => {
    setAutocompleteValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      // console.log(results);

      setValue("streetNumber", description);
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  return (
    <div className="relative">
      <input
        {...field}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setAutocompleteValue(e.target.value);
          field?.onChange(e);
        }}
        disabled={!ready}
        placeholder={translate("common.enter_location")}
        id={id}
        className="border border-borderColor rounded-[4px] w-full p-2 outline-none text-dark text-sm focus:border-primary"
      />

      {status === "OK" && (
        <ul className="suggestions-list flex flex-col gap-y-1 top-[44px]">
          {data?.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => {
                setInputValue(description);
                handleSelect(description);
              }}
              className="px-[6px] py-[10px] flex items-start gap-x-2 cursor-pointer hover:bg-[#f0f0f0]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                className="min-w-[14px] min-h-[15px]"
              >
                <g clip-path="url(#clip0_2433_15842)">
                  <path
                    d="M6.88128 1.20117C4.36571 1.20117 2.31909 3.24779 2.31909 5.76336C2.31909 8.92517 6.88577 14.3262 6.88577 14.3262C6.88577 14.3262 11.4435 8.76968 11.4435 5.76336C11.4435 3.24779 9.39693 1.20117 6.88128 1.20117ZM8.25779 7.09917C7.87823 7.47865 7.3798 7.66842 6.88128 7.66842C6.38284 7.66842 5.88425 7.47865 5.50485 7.09917C4.74582 6.34022 4.74582 5.10527 5.50485 4.34624C5.87239 3.97854 6.36129 3.77602 6.88128 3.77602C7.40126 3.77602 7.89009 3.97862 8.25779 4.34624C9.01682 5.10527 9.01682 6.34022 8.25779 7.09917Z"
                    fill="#616161"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2433_15842">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0 0.770508)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="-mt-1 text-sm font-medium">{description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
