import { LinkProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";

export const LinkField = ({
  linkHref,
  linkText,
  linkImage,
  containerClassName,
  textClassName,
  imageClassName,
}: LinkProps) => {
  const defaultClasses = ``;
  const classes = combineClasses(defaultClasses, containerClassName);
  const textClasses = combineClasses("", textClassName);
  const imageClasses = combineClasses("", imageClassName);
  return (
    <Link href={linkHref} className={classes}>
      {linkText && <span className={textClasses}>linkText</span>}
      {linkImage && (
        <Image
          className={imageClasses}
          src={linkImage.imageSrc}
          alt={linkImage.imageAlt}
          width={linkImage.imageWidth}
          height={linkImage.imageHeight}
        />
      )}
    </Link>
  );
};
