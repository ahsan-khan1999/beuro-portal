import { FlagIconProps } from "@/types";
import styles from "./flag-icon.module.css";

export function FlagIcon({ countryCode = "" }: FlagIconProps) {
  if (countryCode === "en") {
    countryCode = "us";
  }

  return (
    <span className={`fi ${styles.fiCircle} inline-block  fi-${countryCode}`} />
  );
}
