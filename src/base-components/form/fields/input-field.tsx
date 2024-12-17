import { InputProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { combineClasses } from "@/utils/utility";
import addtionalDetailImg from "@/assets/pngs/addtional_details.png";

export const InputField = ({
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
  img,
  remove,
  onRemove,
  fieldIndex,
  onChange,
  percentage,
  step,
}: InputProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const defaultClasses = `border border-borderColor rounded-lg w-full h-10 xMini:h-12 bg-white ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  } pt-[10px] pb-[10px] outline-none text-dark text-sm focus:border-primary`;

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
    <div className={`relative w-full flex items-center`}>
      {img && (
        <Image
          src={addtionalDetailImg}
          alt="paragraph_icon"
          className="absolute top-4 left-4"
        />
      )}
      {svg && (
        <span
          className={`mr-3 absolute left-4 ${
            (inputFocus && "tests") || "test"
          }`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
      {remove && (
        <div
          className="cursor-pointer -top-9 absolute right-0 bg-red px-3 py-1 mt-1 text-white rounded-t-md"
          onClick={onRemove}
        >
          {remove}
        </div>
      )}

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
        pattern={(inputType === "number" && "d+") || "*"}
        // onChangeCapture={}
        //@ts-expect-error
        onChangeCapture={(e) => onChange && onChange(e.target?.value)}
        onKeyDown={handleKeyDown}
      />
      {percentage && (
        <span
          className={`mr-3 absolute left-14 ${
            (inputFocus && "tests") || "test"
          }`}
        >
          {percentage}
        </span>
      )}
      {/* {success && (
        <InputSuccessIcon className="text-middle-green absolute top-2/4 right-4 transform -translate-y-2/4" />
      )} */}
    </div>
  );
};
