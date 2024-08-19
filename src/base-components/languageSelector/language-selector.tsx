import { FlagIcon } from "./flag-icon";
import { LanguageName } from "@/types";
import Image from "next/image";
import checkIcon from "@/assets/svgs/check-fill-green.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import { useLanguageSeleclor } from "@/hooks/languageSelector/useLanguageSelector";
import { combineClasses } from "@/utils/utility";
import { useEffect, useState } from "react";

export const LanguageSelector = ({ className }: LanguageName) => {
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
  const [isXMini, setIsXMini] = useState(false);

  const containerClasses = combineClasses(
    "relative flex items-center justify-center",
    className
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 730px)"); // xMini breakpoint is 640px
    setIsXMini(mediaQuery.matches);

    const handleResize = (event: MediaQueryListEvent) => {
      setIsXMini(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div
      className={containerClasses}
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      <FlagIcon countryCode={selectedLanguage?.code} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center ml-2 text-dark font-medium"
        ref={dropdownRef}
      >
        {isXMini && selectedLanguage?.name}

        <svg
          className={`xMini:ml-2 ${isOpen ? "rotate-180" : ""} `}
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
            className={`absolute flex flex-col top-[42px] right-0 text-dark bg-white rounded-lg p-4 xMini:w-[241px] z-[999999] shadow-languagesDropDown`}
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
                    ? "text-dark font-medium"
                    : "text-dark"
                }   text-left items-center flex justify-between hover:bg-gray-100 ${
                    index % 2 === 0 ? "rounded-r" : "rounded-l"
                  }`}
                >
                  <div className="flex items-center">
                    <FlagIcon countryCode={language.code} />
                    {isXMini && (
                      <span className="truncate ml-3">{language.name}</span>
                    )}
                  </div>
                  {selectedLanguage?.code === language.code && (
                    <Image
                      src={checkIcon}
                      alt="Check Icon Selected"
                      className="hidden xMini:block"
                    />
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
