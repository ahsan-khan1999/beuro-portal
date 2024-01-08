import { ArrowIcon } from "@/assets/svgs/components/arrow-icon";
import { MultiSelectBoxProps, SelectBoxProps } from "@/types";
import { getLabelByValue } from "@/utils/auth.util";
import { useOutsideClick } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useMemo, useRef, useState, useEffect } from "react";

export const MultiSelectBox = ({
  id,
  options,
  value: defaultValues,
  field,
  trigger,
  svg,
  success,
  placeholder,
  className,
  onItemChange,
  disabled,
}: MultiSelectBoxProps) => {
  const [option, setOption] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defaultValues || []
  );

  useEffect(() => {
    if (defaultValues) {
      setOption(options.filter((item) => !defaultValues.includes(item.value)));
    }
  }, [defaultValues]);

  useMemo(() => {
    if (options.length > 0) {
      setOption(options);
    }
  }, [options?.length]);

  const search = useRef<string>("");

  const toggleDropDown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const selectBoxRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const selectedOptionHandler = (value: string) => {
    const isSelected = selectedOptions.includes(value);

    const updatedOptions = isSelected
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);
    field?.onChange(updatedOptions);
    trigger?.(field?.name);
    onItemChange && onItemChange(updatedOptions);

    // Remove the selected option from the available options
    setOption(options.filter((item) => !updatedOptions.includes(item.value)));
  };

  const handleChange = (value: string) => {
    search.current = value;
    setOption(
      options.filter((item) =>
        item.value?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
  };

  const defaultClasses = `cursor-pointer placeholder:text-dark h-12 py-[10px] flex items-center justify-between text-left text-dark bg-white rounded-lg border border-lightGray focus:border-primary outline-none w-full ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  }`;
  const classes = combineClasses(defaultClasses, className);
  const { t: translate } = useTranslation();

  const handleDivScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    container.scrollLeft += e.deltaY;
    e.preventDefault();
  };

  return (
    <div id={id} ref={selectBoxRef} className="relative focus:border-primary">
      <div onClick={() => setIsOpen(!isOpen)} className={classes}>
        <div
          className="flex flex-wrap overflow-x-auto multiSelectScrol"
          onWheel={handleDivScroll}
        >
          {selectedOptions.map((selectedValue) => (
            <span
              key={selectedValue}
              className="m-1 p-2 bg-gray-200 rounded flex-shrink-0"
            >
              {getLabelByValue(selectedValue, options)}

              <span
                className="cursor-pointer ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  selectedOptionHandler(selectedValue);
                }}
              >
                &#10005;
              </span>
            </span>
          ))}
        </div>
        {!disabled && <ArrowIcon isOpen={isOpen} />}
        {svg && (
          <span
            className={`mr-3 absolute left-4 ${(isOpen && "tests") || "test"}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
      <AnimatePresence>
        {!disabled && isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute overflow-x-hidden top-[52px] max-h-[180px] h-fit overflow-y-scroll w-full bg-white border-2 border-lightGray border-t-0 rounded-br-lg rounded-bl-lg rounded-lg z-10 break-all"
          >
            <div className="flex border-y-2 border-lightGray rounded-lg w-full">
              <input
                value={search.current}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={translate("common.search")}
                className="w-full outline-none rounded-lg p-2 focus:border-primary focus:outline"
              />
            </div>
            {option.map(({ value, label }) => (
              <li
                key={value}
                onClick={() => selectedOptionHandler(value)}
                className={`p-2 hover:bg-extra-light-gray cursor-pointer ${
                  selectedOptions.includes(value) ? "bg-gray-200" : ""
                }`}
              >
                {label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
