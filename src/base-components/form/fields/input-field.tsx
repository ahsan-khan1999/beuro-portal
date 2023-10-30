// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { InputProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputEmail } from "@/assets/svgs/components/inputEmail";
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
}: InputProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const defaultClasses = `border border-borderColor rounded-lg w-full  ${
    success ? "pl-4 pr-10" : "pl-10 pr-4"
  } py-[10px] outline-none text-dark text-sm focus:border-primary  `;
  const classes = combineClasses(defaultClasses, className);
  useEffect(() => setValue && setValue(name, value), []);

  return (
    <div>
     

      <div className={` relative w-full flex items-center `}>
        {/* {name == "email" && (
        <InputEmail
          pathClass={inputFocus ? "fill-primary" : "fill-[#8F8F8F]"}
          className="absolute top-4 left-4"
        />
      )} */}
        {/* {svg && (
        // <Image src={svg} alt={alt} className="mr-3 absolute top-4 left-4 tests" />
      svg

      )} */}
       {img && <Image src={addtionalDetailImg} alt="paragraph_icon" className="absolute top-4 left-4"/>}
        {svg && (
          <span
            className={`mr-3 absolute top-4 left-4 ${
              (inputFocus && "tests") || "test"
            }`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}

        <input
          onFocus={() => setInputFocus(true)}
          // onBlur={() => setInputFocus(false)}
          onBlurCapture={() => setInputFocus(false)}
          id={id}
          type={inputType}
          className={`${classes}`}
          defaultValue={value}
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
        />
        {/* {success && (
        <InputSuccessIcon className="text-middle-green absolute top-2/4 right-4 transform -translate-y-2/4" />
      )} */}
      </div>
    </div>
  );
};
