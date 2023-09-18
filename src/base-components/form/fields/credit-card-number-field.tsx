import { useState } from "react";
import { CardType } from "@/enums";
import { CreditCardIconsType, CreditCardInputProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { detectCardType, formatCardNumber, getCardIcon } from "../helpers";

import visaIcon from "@/assets/visa.png";

export const CreditCardNumberField = ({
  id,
  value,
  name,
  register,
  placeholder,
  className,
}: CreditCardInputProps) => {
  const [formattedValue, setFormattedValue] = useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/\D+/g, "");
    const cardInfo = detectCardType(cleanValue);
    const formattedValue = cardInfo?.format
      ? formatCardNumber(cleanValue, cardInfo.format)
      : cleanValue;

    setFormattedValue(formattedValue);
  };

  const cardType = detectCardType(formattedValue);

  const icons: CreditCardIconsType = {
    [CardType.VISA]: visaIcon,
    [CardType.MASTERCARD]: visaIcon,
  };

  const defaultClasses = `border-2 border-lightGray rounded-lg h-12 w-full px-4 py-3 focus:border-primary outline-none`;
  const classes = combineClasses(defaultClasses, className);

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="tel"
        value={formattedValue}
        {...register(name)}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={classes}
      />
      {getCardIcon({cardType, icons})}
    </div>
  );
};
