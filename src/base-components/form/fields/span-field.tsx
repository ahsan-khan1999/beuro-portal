import { SpanProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Link from "next/link";

export const SpanField: React.FC<SpanProps> = ({
  text,
  linkText,
  linkHref,
  containerClassName,
  linkClassName,
  dispatch,
  onClick,
  html,
}) => {
  const linkClasses = combineClasses("text-secondary", linkClassName);
  return dispatch ? (
    <span className={`${containerClassName}`}>
      {text}&nbsp;
      <span
        className={`${linkClasses}`}
        onClick={() => dispatch(onClick && onClick())}
      >
        {linkText}
      </span>
    </span>
  ) : html ? (
    <span
      className={`${containerClassName || ""}`}
      onClick={() => onClick && onClick()}
      dangerouslySetInnerHTML={{ __html: html }}
    ></span>
  ) : (
    <span
      className={`${containerClassName || ""}`}
      onClick={() => onClick && onClick()}
    >
      {text}
      {linkText && (
        <Link className={`${linkClasses} `} href={linkHref ? linkHref : "/"}>
          {linkText}
        </Link>
      )}
    </span>
  );
};
