import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export const CustomLocationInput = ({ field, setValue }: any) => {
  const {
    ready,
    value, // value of usePlacesAutocomplete
    suggestions: { status, data },
    setValue: setAutoCompleteValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {}, // You can restrict it based on region or country here
  });

  const handleSelect = async (description: string) => {
    // Set selected location to input and clear suggestions
    setAutoCompleteValue(description, false);
    clearSuggestions();

    try {
      // Get Geocode details
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      console.log("Coordinates: ", { lat, lng });

      // Set the selected location back to RHF field
      setValue("location", description); // Update the form field with location
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div>
      <input
        {...field} // Pass the form field props from RHF
        placeholder="Enter location"
        value={value} // Autocomplete value handled by use-places-autocomplete
        onChange={(e) => {
          setAutoCompleteValue(e.target.value); // Update autocomplete suggestions
          field.onChange(e); // Update form state with new value via RHF
        }}
        disabled={!ready}
        className="border border-borderColor rounded-[4px] w-full p-2 outline-none text-dark text-sm focus:border-primary"
      />
      {status === "OK" && (
        <ul>
          {data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <li
                key={place_id}
                onClick={() => handleSelect(suggestion.description)}
              >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
