import { FooterLeftSection } from "./footer-left-section";
import { FooterMiddleSection } from "./footer-middle-section";
import { FooterRightSection } from "./footer-right-section";

const FOOTER_LINKS = [
  {
    title: "Populäre Kategorien",
    links: [
      {
        linkText: "Computer",
        linkHref: "/",
      },
      {
        linkText: "Möbel und Wohnkultur",
        linkHref: "/",
      },
      {
        linkText: "Haushaltsgeräte",
        linkHref: "/",
      },
      {
        linkText: "Telefon & Zubehör",
        linkHref: "/",
      },
    ],
  },
  {
    title: "Mein Konto",
    links: [
      {
        linkText: "Meine Anzeigen",
        linkHref: "/",
      },
      {
        linkText: "Favoriten",
        linkHref: "/",
      },
      {
        linkText: "Anzegige aufgeben",
        linkHref: "/",
      },
    ],
  },
  {
    title: "Information",
    links: [
      {
        linkText: "Kontakt",
        linkHref: "/",
      },
      {
        linkText: "Hilfe",
        linkHref: "/",
      },
      {
        linkText: "Häufig gestellte Fragen",
        linkHref: "/",
      },
      {
        linkText: "Impressum",
        linkHref: "/",
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="">
      <div className="grid xl:grid-cols-5 md:grid-cols-4 mx-auto max-w-maxSize border-t-2 border-lightGray ">
        <FooterLeftSection />
        <FooterMiddleSection items={FOOTER_LINKS} />
        <FooterRightSection />
      </div>
      <p className=" -mx-5 flex items-center justify-center h-5 bg-secondary text-xs text-white">
        © 2023 Kaufes. Powered by Swiss Helden
      </p>
    </footer>
  );
};
