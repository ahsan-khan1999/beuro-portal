
import { useState } from "react";
import { combineClasses } from "@/utils/utility";
import { CreditCardExpiryDateInputProps } from "@/types";

export const CreditCardExpiryDateField = ({
  id,
  value,
  name,
  register,
  placeholder,
  className,
}: CreditCardExpiryDateInputProps) => {
  const [formattedValue, setFormattedValue] = useState(value || "");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove any non-digit characters except for the slash
    const cleanedValue = rawValue.replace(/[^0-9/]/g, '');
  
    // Check if user typed two 0s consecutively
    if (/00/.test(cleanedValue)) {
      // Remove the second 0 and update formatted value
      const updatedValue = cleanedValue.replace('00', '0');
      setFormattedValue(updatedValue);
      return;
    }
  
    // Split the input by the slash
    let [rawMonth, rawYear] = cleanedValue.split('/');
  
    // Take only the first two characters for month and year
    const month = (rawMonth || '').slice(0, 2);
    const year = (rawYear || '').slice(0, 2);
  
    // If the month is 00 or > 12, show an alert and halt further processing
    if (month === "00" || (month.length === 2 && (parseInt(month) < 1 || parseInt(month) > 12))) {
      return;
    }
  
    // If the year is 00, show an alert and halt further processing
    if (year === "00") {
      return;
    }
  
    // If the month has two digits but there's no slash, add one
    if (month.length === 2 && !cleanedValue.includes('/')) {
      rawYear = '';
    }
  
    // Combine them back
    const combinedValue = month + (year ? '/' + year : (month.length === 2 || cleanedValue.endsWith('/') ? '/' : ''));
  
    setFormattedValue(combinedValue);
  };  

  const defaultClasses = `border-2 border-lightGray rounded-lg h-12 w-full px-4 py-3 focus:border-primary outline-none`;
  const classes = combineClasses(defaultClasses, className);

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        maxLength={5}
        value={formattedValue}
        {...register(name)}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={classes}
      />
    </div>
  );
};


