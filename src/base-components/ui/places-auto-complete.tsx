import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import style from "@/styles/advert.module.css";
import {
  updateAdvertLocation,
  updateLocation,
  setFilter,
} from "@/api/slices/globalSlice/global";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

export interface PlaceInputProps {
  onAddressSelect: (value: string) => void;
  padding?: string;
}

export const PlacesAutocomplete = ({
  onAddressSelect,
  padding,
}: PlaceInputProps) => {
  const { locationSearch, filter } = useAppSelector((state) => state.global);
  const { t: translate } = useTranslation(["common"]);
  const dispatch = useAppDispatch();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;
      return (
        <li
          key={place_id}
          onClick={() => {
            localStorage.setItem("location", description);
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
            dispatch(updateLocation(description));
          }}
        >
          <strong>{main_text}</strong>
        </li>
      );
    });
  };

  return (
    <div className={style.autocompleteWrapper}>
      <input
        placeholder={translate("common.search")}
        defaultValue={locationSearch || ""}
        value={locationSearch || ""}
        className={style.textInputPlace}
        style={{ padding: padding }}
        disabled={!ready}
        onChange={(e) => {
          if (!e.target.value) {
            dispatch(updateAdvertLocation("None"));
            dispatch(updateLocation(""));
            dispatch(
              setFilter({
                ...filter,
                filter: {
                  ...filter,
                  location: "None",
                },
              })
            );
            setValue(null || "");
          } else {
            setValue(e.target.value);
            dispatch(updateLocation(e.target.value));
          }
        }}
      />
      {status === "OK" && (
        <ul className={style.suggestionWrapper}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};
