import { FooterMiddleSectionProps } from "@/types";
import { FooterMiddleItems } from "./footer-middle-items";

export const FooterMiddleSection = ({items}: FooterMiddleSectionProps) => {
  return (
    <div className="flex gap-5 col-span-3 justify-between border-x border-lightGray pt-30 pb-7 pl-5 pr-4">
      {items.map(({ title, links }, idx) => (
        <FooterMiddleItems key={idx} title={title} links={links} />
      ))}
    </div>
  );
};
