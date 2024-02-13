import { Country } from "@/components/reactPdf/address-details";
import { ContactDetailsProps } from "@/types/types";
import { GenderLabel } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const ContactDetails = ({
  address,
  email,
  phone,
  gender,
  mobile
}: Partial<ContactDetailsProps>) => {
  const { t: translation } = useTranslation();
  const { city, name, postalCode, streetWithNumber } = address || {};
  return (
    <div className="grid grid-cols-4 items-center mt-5 mb-[37px]">
      <div className="flex flex-col gap-[0px] col-span-3">
        <span className="text-[#000] text-base font-medium">{GenderLabel[gender as keyof typeof GenderLabel] || ""} {name}</span>
        <span className="text-[#000] text-base font-medium">
          {streetWithNumber}
        </span>
        <span className="text-[#000] text-base font-medium">
          {postalCode} {Country[city as keyof typeof Country] || ""}
        </span>
      </div>

      <div className="flex flex-col gap-y-[0px] col-span-1">
        {
          email &&
          <div className="space-x-3">
            <span className="text-[#000] text-base font-medium">
              {translation("pdf.email")}:
            </span>
            <span className="text-[#000] text-base font-medium"> {email}</span>
          </div>
        }
        {
          (phone !== "+" && phone) &&
          <div className="space-x-3">
            <span className="text-[#404040] text-base font-medium">
              {translation("pdf.phone")}:
            </span>
            <span className="text-[#000] text-base font-medium"> {phone}</span>
          </div>
        }
        {
          (mobile !== "+" && mobile) &&
          <div className="space-x-3">
            <span className="text-[#404040] text-base font-medium">
              {translation("pdf.mobile")}:
            </span>
            <span className="text-[#000] text-base font-medium"> {mobile}</span>
          </div>
        }
      </div>
    </div>
  );
};
