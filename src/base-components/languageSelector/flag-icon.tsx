import { FlagIconProps, FlagType } from "@/types";
import styles from "./flag-icon.module.css";

import englishFlag from '@/assets/pngs/english-flag.webp';
import germanyFlag from '@/assets/pngs/germany-flag.webp';
import Image from "next/image";

const flagLookups = {
  [FlagType.en]: englishFlag,
  [FlagType.de]: germanyFlag,
}

export function FlagIcon({ countryCode = FlagType.de }: FlagIconProps) {
  // if (countryCode === FlagType.en) {
  //   countryCode = FlagType.de;
  // }

  return (
    // <span className={`fi ${styles.fiCircle} inline-block  fi-${countryCode}`} />
    <Image alt="flag" src={flagLookups[countryCode]} width={28} height={19} />
  );
}
