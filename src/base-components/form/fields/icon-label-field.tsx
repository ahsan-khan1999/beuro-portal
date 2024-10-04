import { IconLabelProps, Location } from "@/types";
import { combineClasses } from "@/utils/utility";
import { useState } from "react";

export const IconLabelFeild = ({
  id,
  containerClassName,
  icon,
  text,
  textClassName,
  isLocation,
  setValue,
}: IconLabelProps) => {
  const [location, setLocation] = useState<Location>({ lat: null, lng: null });
  const [address, setAddress] = useState<string | null>(null);

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        setValue && setValue("streetNumber", formattedAddress);
      } else {
        setAddress("Address not found");
        setValue && setValue("streetNumber", "Address not found");
      }
    } catch (error) {
      console.log("Error fetching address:", error);
      setAddress("Error fetching address");
      setValue && setValue("streetNumber", "Error fetching address");
    }
  };

  const handleLocationClick = () => {
    if (isLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const defaultClasses = combineClasses(
    `flex items-center gap-x-1 ${isLocation ? "cursor-pointer" : ""}`,
    containerClassName
  );

  const textClasses = combineClasses(
    "text-sm font-medium text-[#272727]",
    textClassName
  );

  return (
    <div
      className={defaultClasses}
      id={id}
      onClick={isLocation ? handleLocationClick : undefined}
    >
      <span dangerouslySetInnerHTML={{ __html: icon }} />
      <span className={textClasses}>{text}</span>
    </div>
  );
};
