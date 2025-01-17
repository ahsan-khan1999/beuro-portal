import { ArrowIcon } from "@/assets/svgs/components/arrow-icon";
import { SelectBoxProps } from "@/types";
import { getLabelByValue } from "@/utils/auth.util";
import { useOutsideClick } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import searchIcon from "@/assets/svgs/search-icon.png";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";

export const SelectBox = ({
  id,
  options,
  value: defaultValue,
  field,
  trigger,
  svg,
  success,
  className,
  onItemChange,
  disabled,
  fieldIndex,
  isLocalCustomer,
}: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(options);

  useEffect(() => {
    if (defaultValue) {
      field?.onChange(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    setOption(options);
  }, [options]);

  const search = useRef<string>("");
  const { t: translate } = useTranslation();

  const selectBoxRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const selectedOptionHandler = (value: string) => {
    onItemChange && onItemChange(value, fieldIndex);
    setIsOpen(false);
    field?.onChange(value);
    trigger?.(field?.name);
  };

  const handleChange = (value: string) => {
    search.current = value;
    setOption(
      option?.filter((item) =>
        item.label?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
  };

  const defaultClasses = `${
    disabled ? "cursor-default" : "cursor-pointer"
  } placeholder:text-dark h-10 xMini:h-12 py-[10px] flex items-center justify-between text-left text-dark bg-white rounded-lg border border-lightGray focus:border-primary outline-none w-full ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  }`;

  const classes = combineClasses(defaultClasses, className);
  const selectedLabel =
    (field && getLabelByValue(field?.value, option)) ||
    getLabelByValue(defaultValue, option);

  const displayedOptions = isLocalCustomer ? [...option].reverse() : option;
  return (
    <div id={id} ref={selectBoxRef} className="relative focus:border-primary">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`${classes}`}
      >
        {!selectedLabel && (
          <span className="text-sm text-[#1E1E1E] font-normal truncate">
            {translate("common.please_choose")}
          </span>
        )}
        <span className="text-sm text-[#1E1E1E] font-normal truncate">
          {selectedLabel}
        </span>
        {!disabled && <ArrowIcon isOpen={isOpen} />}
        {svg && (
          <span
            className={`mr-3 absolute left-4 ${(isOpen && "tests") || "test"}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </button>
      <AnimatePresence>
        {!disabled && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="select_scrollbar absolute overflow-x-hidden top-[56px] max-h-[180px] h-fit overflow-scroll w-full bg-white border border-lightGray rounded-br-lg rounded-bl-lg rounded-lg z-10"
          >
            <motion.ul className="p-2" id="dropdownSerchBar">
              <div className="flex items-center border border-lightGray rounded-md w-full mb-2">
                <Image
                  src={searchIcon}
                  alt="Search Icon"
                  className="ml-1 w-4 h-4 absolute"
                  width={24}
                  height={8}
                />
                <input
                  value={search.current}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={translate("common.search")}
                  className="w-full ps-6 focus:outline-primary focus:outline rounded-md p-2 placeholder:text-sm bg-[#f6f6f7]"
                />
              </div>
              {isLocalCustomer && displayedOptions?.length === 0 ? (
                <p className="text-center text-gray-500">
                  {translate("common.no_customer_found")}
                </p>
              ) : (
                displayedOptions?.map(({ value, label }) => (
                  <li
                    key={value}
                    onClick={() => selectedOptionHandler(value)}
                    className="p-2 hover:bg-[#eaebec] cursor-pointer rounded-sm hoverTransetion"
                  >
                    {label}
                  </li>
                ))
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
