import { NextRouter } from "next/router";

export type QueryUpdate = (router: NextRouter, lang: string) => void;

export interface Locale {
    locale: string
}

export interface FlagIconProps {
    countryCode?: string;
}
export interface Language {
    code: string;
    name: string;
}