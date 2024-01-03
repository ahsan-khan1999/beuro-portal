import { useState, useEffect, useRef } from "react";
import { Language } from "@/types";
import { useTranslation } from "next-i18next";

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

export const useLanguageSeleclor = () => {
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

  return {
    languages,
    handleLanguageChange,
    selectedLanguage,
    dropdownRef,
    setIsOpen,
    isOpen,
  };
};
