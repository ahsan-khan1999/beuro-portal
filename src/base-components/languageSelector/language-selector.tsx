import { FlagIcon } from "./flag-icon";
import { LanguageName } from "@/types";
import Image from "next/image";
import checkIcon from "@/assets/svgs/check-fill-green.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import { useLanguageSeleclor } from "@/hooks/languageSelector/useLanguageSelector";

export const LanguageSelector = ({ name = "" }: LanguageName) => {
  const {
    handleLanguageChange,
    languages,
    selectedLanguage,
    dropdownRef,
    setIsOpen,
    isOpen,
  } = useLanguageSeleclor();

  const hanldeClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(hanldeClose);

  return (
    <div className="relative flex items-center justify-center" ref={ref}>
      <FlagIcon countryCode={selectedLanguage?.code} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center ml-2 text-dark font-medium"
        ref={dropdownRef}
      >
        {selectedLanguage?.name}

        <svg
          className={`ml-2  ${isOpen ? "rotate-180" : ""} `}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
        >
          <path
            d="M1.64648 2L7.64648 8L13.6465 2"
            stroke="#8F8F8F"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute flex flex-col top-[42px] right-0 text-dark bg-white  rounded-lg  p-4 w-[241px] z-[999999] shadow-languagesDropDown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {languages.map((language, index) => {
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`${index !== 0 && "pt-3"} 
                ${
                  index !== languages.length - 1 &&
                  "pb-3 border-b border-[#EEEEEE]"
                }
                ${
                  selectedLanguage?.code === language.code
                    ? "text-dark  font-medium "
                    : "text-dark"
                }   text-left items-center flex justify-between hover:bg-gray-100 ${
                    index % 2 === 0 ? "rounded-r" : "rounded-l"
                  }`}
                >
                  <div className="flex items-center">
                    <FlagIcon countryCode={language.code} />
                    <span className="truncate ml-3">{language.name}</span>
                  </div>
                  {selectedLanguage?.code === language.code && (
                    <Image src={checkIcon} alt="Check Icon Selected" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
