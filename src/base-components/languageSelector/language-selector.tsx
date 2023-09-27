import { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { FlagIcon } from "./flag-icon";
import { Language, LanguageName } from "@/types";
import Image from "next/image";
import checkIcon from "@/assets/svgs/check-fill-green.svg";

const DUMMY_LIST = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "de",
    name: "German",
  },
  {
    code: "ch",
    name: "Deutsch",
  },
  {
    code: "it",
    name: "Italian",
  },
];

export const LanguageSelector = ({ name = "" }: LanguageName) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [languages, setLanguages] = useState<Language[]>([]);

  const dropdownRef = useRef<HTMLButtonElement>(null);

  const selectedLanguage = DUMMY_LIST.find(
    (language) => language.code === i18n.language
  );

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language.code);
    setIsOpen(false);
  };

  useEffect(() => {
    setLanguages(DUMMY_LIST as Language[]);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //#region might be needed in future
  // const LANGUAGE_SELECTOR_ID = "language-selector";
  // useEffect(() => {
  //   const handleWindowClick = (event: any) => {
  //     const target = event.target.closest("button");
  //     if (target && target.id === LANGUAGE_SELECTOR_ID) {
  //       return;
  //     }
  //     setIsOpen(false);
  //   };
  //   window.addEventListener("click", handleWindowClick);
  //   return () => {
  //     window.removeEventListener("click", handleWindowClick);
  //   };
  // }, []);
  // if (!selectedLanguage) {
  //   return null;
  // }
  //#endregion
  return (
    //#region might be needed in future
    // <div className="flex items-center z-10 text-dark">
    //   <div className="relative inline-block text-left">
    //     <div>
    //       <button
    //         onClick={() => setIsOpen(!isOpen)}
    //         type="button"
    //         className="inline-flex items-center justify-center w-full rounded-md shadow-sm bg-transparent text-sm font-medium text-white hover:bg-transparent focus:outline-none"
    //         id={LANGUAGE_SELECTOR_ID}
    //         aria-haspopup="true"
    //         aria-expanded={isOpen}
    //       >
    //         <FlagIcon countryCode={selectedLanguage.code} />
    //         {selectedLanguage.name}
    //         <svg
    //           className="-mr-1 ml-2 h-5 w-5"
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //           aria-hidden="true"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //     {isOpen && (
    //       <div
    //         className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    //         role="menu"
    //         aria-orientation="vertical"
    //         aria-labelledby="language-selector"
    //       >
    //         <div className="py-1 grid grid-cols-2 gap-2" role="none">
    //           {languages.map((language, index) => {
    //             return (
    //               <button
    //                 key={language.code}
    //                 onClick={() => handleLanguageChange(language)}
    //                 className={`${
    //                   selectedLanguage.code === language.code
    //                     ? "bg-gray-100 text-gray-900"
    //                     : "text-gray-700"
    //                 } px-4 py-2 text-sm text-left items-center inline-flex hover:bg-gray-100 ${
    //                   index % 2 === 0 ? "rounded-r" : "rounded-l"
    //                 }`}
    //                 role="menuitem"
    //               >
    //                 <FlagIcon countryCode={language.code} />
    //                 <span className="truncate">{language.name}</span>
    //               </button>
    //             );
    //           })}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    //#endregion

    <div className="relative flex items-center justify-center ">
      <FlagIcon
        countryCode="en"
        // countryCode={selectedLanguage?.code}
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center ml-2 text-dark font-medium"
        ref={dropdownRef}
      >
        English
        {/* {selectedLanguage?.name} */}
        {/* <svg
          className={`ml-1 h-4 w-4 ${isOpen ? "rotate-180" : ""} `}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <g id="drop-down-icon" transform="translate(-461 -88)">
            <rect
              id="Rectangle_969"
              data-name="Rectangle 969"
              width="16"
              height="16"
              transform="translate(461 88)"
              fill="none"
            />
            <path
              className={`${
                name.includes("help center") ? "stroke-black" : "stroke-white"
              }`}
              id="Path_18692"
              data-name="Path 18692"
              d="M615,1476.594l5.233,5.233,5.233-5.233"
              transform="translate(-151.397 -1383.182)"
              fill="none"
              // stroke="#000"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </g>
        </svg> */}
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
      {isOpen && (
        <div className="absolute flex flex-col top-[42px] right-0 text-dark bg-white  rounded-lg  p-4 w-[241px] z-[999999] shadow-languagesDropDown">
          {languages.map((language, index) => {
            return (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`  ${index !== 0 && "pt-3"} 
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
        </div>
      )}
    </div>
  );
};
