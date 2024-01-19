import { NextRouter } from "next/router";

export type QueryUpdate = (router: NextRouter, lang: string) => void;

export interface Locale {
    locale: string
}

export enum FlagType {
    en = "en",
    de = "de",
}

export interface FlagIconProps {
    countryCode?: FlagType;
}
export interface Language {
    code: FlagType;
    name: string;
}