import { FooterLinksProps } from "@/types";
import Link from "next/link";

export const FooterMiddleItems = ({ title, links }: FooterLinksProps) => {
  return (
    <div className="space-y-5">
      <h1 className="text-primary font-semibold">{title}</h1>
      <div className="flex flex-col gap-y-2.5">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.linkHref}
            className="text-sm text-dark font-medium"
          >
            {link.linkText}
          </Link>
        ))}
      </div>
    </div>
  );
};
