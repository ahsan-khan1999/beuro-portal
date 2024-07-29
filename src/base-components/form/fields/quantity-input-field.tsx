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
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultClasses = `border border-[#D0D5DD] rounded-[4px] max-w-[54px] h-[54px] !bg-white p-2 outline-none text-dark text-sm focus:border-primary`;

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

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`flex items-center gap-x-[13px]`}>
      {svg && (
        <span
          //   className={`w-[30px] h-5 ${(inputFocus && "tests") || "test"}`}
          className={`w-[30px] h-5`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}

      <p className="text-[#1C1F35] text-base font-medium m-w-[122px] w-full">
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
        // pattern={(inputType === "number" && "d+") || "*"}
        //@ts-expect-error
        onChangeCapture={(e) => onChange && onChange(Number(e.target?.value))}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
