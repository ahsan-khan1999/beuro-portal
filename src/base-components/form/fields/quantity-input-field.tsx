import { QuantityInputProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { combineClasses } from "@/utils/utility";

export const QuantityInputField = ({
  id,
  inputType,
  value,
  name,
  register,
  placeholder,
  className,
  success,
  disabled,
  setValue,
  svg,
  fieldIndex,
  onChange,
  step,
  inputLabelValue,
}: QuantityInputProps) => {
  const [inputFocus, setInputFocus] = useState(false);

  const defaultClasses = `border border-[#D0D5DD] rounded-[4px] max-w-[40px] h-[40px] !bg-white outline-none text-dark text-sm focus:border-primary text-center`;

  const classes = combineClasses(defaultClasses, className);

  useEffect(() => setValue && setValue(name, value), []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.onwheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    return () => {
      inputElement.onwheel = null;
    };
  }, [id]);

  return (
    <div className={`flex items-center gap-x-[13px]`}>
      {svg && (
        <span
          className={`w-[30px] h-5`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}

      <p className="text-[#1C1F35] text-base font-medium w-full">
        {inputLabelValue}
      </p>
      <input
        onFocus={() => setInputFocus(true)}
        onBlurCapture={() => setInputFocus(false)}
        id={id}
        type={inputType}
        className={`${classes}`}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        key={id}
        step={step}
        min={0}
        //@ts-expect-error
        onChangeCapture={(e) => onChange && onChange(Number(e.target?.value))}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
