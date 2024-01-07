import { ContactDetailsProps } from "@/types/types";
import { useTranslation } from "next-i18next";

export const ContactDetails = ({
  address: { city, name, postalCode, streetWithNumber },
  email,
  phone,
}: ContactDetailsProps) => {
  const { t: translation } = useTranslation();
  return (
    <div className="grid grid-cols-4 items-center mt-5 mb-[37px]">
      <div className="flex flex-col gap-[4px] col-span-3">
        <span className="text-[#000] text-base font-medium">{name}</span>
        <span className="text-[#000] text-base font-medium">
          {streetWithNumber}
        </span>
        <span className="text-[#000] text-base font-medium">
          {postalCode} {city}
        </span>
      </div>

      <div className="flex flex-col gap-y-[6px] col-span-1">
        <div className="space-x-3">
          <span className="text-[#000] text-base font-medium">
            {translation("pdf.email")}:
          </span>
          <span className="text-[#000] text-base font-medium"> {email}</span>
        </div>
        <div className="space-x-3">
          <span className="text-[#404040] text-base font-medium">
            {translation("pdf.phone")}:
          </span>
          <span className="text-[#000] text-base font-medium"> {phone}</span>
        </div>
      </div>
    </div>
  );
};