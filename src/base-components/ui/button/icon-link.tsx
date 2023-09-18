import { ImageLinkProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Link from "next/link";
import Loader from "../loader/loader";


export const IconLink = ({ linkHref, linkText, className, children, loading }: ImageLinkProps) => {
  const defaultClasses =
    "flex items-center gap-x-4 bg-white px-4 h-12";
  const classes = combineClasses(defaultClasses, className);
  return (
    loading ? <Link href={linkHref} className={`${classes}`}>
      <Loader height="50" width="50" radius="9" color="#68119a" />
    </Link> :
      <Link href={linkHref} className={`${classes}`}>
        <span className="group-hover:text-primary">{linkText}</span>
        {children}
      </Link>
  );
};
