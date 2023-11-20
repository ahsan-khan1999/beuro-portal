// import { ArrowIcon } from "@/assets/svgs/components/arrow-icon";
import { ArrowIcon } from "@/assets/svgs/components/arrow-icon";
import { SelectBoxProps } from "@/types";
import { getLabelByValue } from "@/utils/auth.util";
import { useOutsideClick } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
// import searchIcon from "@/assets/svgs/search.svg";

export const SelectBox = ({
  id,
  options,
  value: defaultValue,
  field,
  trigger,
  svg,
  success,
  placeholder,
  className,
  onItemChange,
  disabled,
}: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(options);
  useMemo(() => {
    if (options.length > 0) {
      setOption(options);
    }
  }, [options.length]);

  const search = useRef<string>("");

  const toggleDropDown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const selectBoxRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const selectedOptionHandler = (value: string) => {
    setIsOpen(false);
    field?.onChange(value);
    trigger?.(field?.name);
    onItemChange && onItemChange();
  };

  const handleChange = (value: string) => {
    search.current = value;
    setOption(
      options.filter((item) =>
        item.value?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
  };
  const defaultClasses = `placeholder:text-dark  py-[10px] flex items-center justify-between  text-left text-dark bg-white  rounded-lg border border-lightGray focus:border-primary outline-none w-full ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  }`;
  const classes = combineClasses(defaultClasses, className);

  return (
    <div id={id} ref={selectBoxRef} className="relative focus:border-primary">
      <button
        placeholder={placeholder}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={classes}
      >
        {(field && getLabelByValue(field.value,option)) || defaultValue}

        {!disabled && <ArrowIcon isOpen={isOpen} />}
        {svg && (
          <span
            className={`mr-3 absolute  left-4 ${(isOpen && "tests") || "test"}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </button>
      {!disabled && isOpen && (
        <ul className="absolute top-[52px] w-full bg-white border-2 border-lightGray border-t-0 rounded-br-lg rounded-bl-lg rounded-lg z-10">
          <div className="flex border-y-2 border-lightGray rounded-lg  w-full">
            {/* <Image src={searchIcon} alt={"Search Icon"} className="ml-3" /> */}

            <input
              value={search.current}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search..."
              className="w-full outline-none rounded-lg p-2"
            />
          </div>
          {option.map(({ value, label }) => (
            <li
              key={value}
              onClick={() => selectedOptionHandler(value)}
              className="p-2 hover:bg-extra-light-gray cursor-pointer"
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
