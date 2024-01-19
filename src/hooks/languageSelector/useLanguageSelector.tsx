import { useState, useEffect, useRef } from "react";
import { Language } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const DUMMY_LIST = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "de",
    name: "German",
  },
];

export const useLanguageSeleclor = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const router = useRouter();
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const selectedLanguage = DUMMY_LIST.find(
    (language) => language.code === i18n.language
  );

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language.code);
    setIsOpen(false);
    const updatedQuery = {
      ...router.query,
    };
    const routeWithQuery = {
      pathname: `${router.pathname}`,
      query: updatedQuery,
    };
    router.push(routeWithQuery, undefined, {
      locale: language?.code,
    });
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
