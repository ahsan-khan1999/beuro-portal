import { ArrowIcon } from "@/assets/svgs/components/arrow-icon";
import { AgentSelectBoxProps } from "@/types";
import { getAgentLabelByValue } from "@/utils/auth.util";
import { useOutsideClick } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useState, useEffect } from "react";
import searchIcon from "@/assets/svgs/search-icon.png";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import dummyAgentProfile from "@/assets/pngs/dummyAgent.png";

export const AgentSelectBox = ({
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
  fieldIndex,
  onEnterPress,
}: AgentSelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (defaultValue) {
      field?.onChange(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    setOption(options);
  }, [options]);

  const selectBoxRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const selectedOptionHandler = (value: string) => {
    onItemChange && onItemChange(value, fieldIndex);
    setIsOpen(false);
    field?.onChange(value);
    trigger?.(field?.name);
  };

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onEnterPress && onEnterPress(searchTerm);
    }
  };

  const defaultClasses = `placeholder:text-dark h-12 py-[10px] flex items-center justify-between text-left text-dark bg-white rounded-lg border border-lightGray focus:border-primary outline-none w-full ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  }`;

  const classes = combineClasses(defaultClasses, className);
  const { t: translate } = useTranslation();

  const selectedLabel =
    (field && getAgentLabelByValue(field.value, option)) ||
    getAgentLabelByValue(defaultValue, option);

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

        <span className="truncate flex items-center gap-x-2 text-sm text-[#1E1E1E] font-normal">
          {(field && getAgentLabelByValue(field.value, option)) ||
            getAgentLabelByValue(defaultValue, option)}
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
                  value={searchTerm}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={translate("common.search")}
                  className="w-full ps-6 focus:outline-primary focus:outline rounded-md p-2 placeholder:text-sm bg-[#f6f6f7]"
                />
              </div>
              {option?.map(({ value, label }, index) => (
                <li
                  key={index}
                  onClick={() => selectedOptionHandler(value.name)}
                  className="p-2 hover:bg-[#eaebec] cursor-pointer rounded-sm hoverTransetion border-b border-b-lightGray pb-1"
                >
                  <div className="flex items-center justify-between gap-x-3">
                    <div className="flex items-center gap-x-3">
                      <Image
                        src={label.picture || dummyAgentProfile}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className="text-[#191D23] text-base font-medium">
                        {label.name}
                      </span>
                    </div>
                    {/* <span
                      className={`${
                        value.status === "Available"
                          ? "text-[#45C769]"
                          : "text-[#838383]"
                      } text-base font-medium`}
                    >
                      {label.status}
                    </span> */}
                  </div>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
