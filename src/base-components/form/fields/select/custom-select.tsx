// import { ArrowIcon } from "@/assets/svgs/components/arrow-icon";
import { SelectBoxProps } from "@/types";
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
  placeholder,
  className,
}: SelectBoxProps) => {
  console.log(className, "1243");
  defaultValue = "Please select a value";
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
  };

  const handleChange = (value: string) => {
    search.current = value;
    setOption(
      options.filter((item) =>
        item.value?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
  };
  const defaultClasses =
    "h-[42px] placeholder:text-dark px-4 py-[10px] flex items-center justify-between  text-left text-dark bg-white  rounded-lg border border-lightGray focus:border-primary outline-none w-full";
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
        {(field && field.value) || defaultValue}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
        >
          <path
            d="M1.93359 1.4209L7.43359 7.4209L12.9336 1.4209"
            stroke="#4B4B4B"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
        {/* <ArrowIcon isOpen={isOpen} /> */}
      </button>
      {isOpen && (
        <ul className="absolute top-[52px] w-full bg-white border-2 border-lightGray border-t-0 rounded-br-lg rounded-bl-lg rounded-lg z-[1]">
          <div className="flex border-y-2 border-lightGray rounded-lg  w-full">
            {/* <Image src={searchIcon} alt={"Search Icon"} className="ml-3" /> */}

            <input
              value={search.current}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search..."
              className="w-full px-2 py-3 outline-none rounded-lg "
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
