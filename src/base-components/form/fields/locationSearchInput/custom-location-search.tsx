import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { CustomLocationInputProps } from "@/types";
import { useState } from "react";

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
      componentRestrictions: { country: "ch" },
    },
    debounce: 300,
  });

  const handleSelect = async (description: string) => {
    setAutocompleteValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      setValue("streetNumber", description);
      console.log({ lat, lng }, "Location selected");
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  console.log(data, "data");

  return (
    <>
      <input
        {...field}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setAutocompleteValue(e.target.value);
          field?.onChange(e);
        }}
        disabled={!ready}
        placeholder="Enter a location"
        id={id}
        className="border border-borderColor rounded-[4px] w-full p-2 outline-none text-dark text-sm focus:border-primary"
      />

      {status === "OK" && (
        <ul className="suggestions-list">
          {data?.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => {
                setInputValue(description);
                handleSelect(description);
              }}
              className="suggestion-item"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
