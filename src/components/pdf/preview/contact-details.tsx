import { Country } from "@/components/reactPdf/address-details";
import { ContactDetailsProps } from "@/types/types";
import { GenderLabel } from "@/utils/static";
import { useTranslation } from "next-i18next";

const langContent = {
  en: {
    gender: {
      Mr: "Mr",
      Mrs: "Mrs",
    },
  },
  de: {
    gender: {
      Mr: "Herr",
      Mrs: "Frau",
    },
  },
};

export const ContactDetails = ({
  address,
  email,
  phone,
  gender,
  mobile,
  isReverseInfo,
  language,
}: Partial<ContactDetailsProps>) => {
  const { t: translate } = useTranslation();
  const { city, name, postalCode, streetWithNumber, companyName } =
    address || {};

  return (
    <div className="grid grid-cols-4 items-center mt-5 mb-[37px]">
      {isReverseInfo ? (
        <>
          <div className="flex flex-col gap-y-[0px] col-span-3">
            {email && (
              <div className="space-x-0">
                <span className="text-sm font-medium">
                  {translate("pdf.email")} :
                </span>
                <span className="text-sm font-medium">{email}</span>
              </div>
            )}
            {phone !== "+" && phone && (
              <div className="space-x-0">
                <span className="text-[#404040] text-sm font-medium">
                  {translate("pdf.phone")} :
                </span>
                <span className="text-sm font-medium">{phone}</span>
              </div>
            )}
            {mobile !== "+" && mobile && (
              <div className="space-x-0">
                <span className="text-[#404040] text-sm font-medium">
                  {translate("pdf.mobile")} :
                </span>
                <span className="text-sm font-medium">{mobile}</span>
              </div>
            )}
          </div>
          <div className="col-span-1 ml-[80px]">
            <div className="flex flex-col gap-[0px] w-[185px]">
              {companyName && (
                <span className="text-sm font-medium">{companyName}</span>
              )}
              <div className="flex gap-1">
                {gender && (
                  <span className="text-sm font-medium">
                    {
                      langContent[language as keyof typeof langContent]?.gender[
                        gender as keyof typeof GenderLabel
                      ]
                    }
                  </span>
                )}
                <span className="text-sm font-medium">{name}</span>
              </div>
              {streetWithNumber && (
                <span className="text-sm font-medium">{streetWithNumber}</span>
              )}
              <div className="flex gap-1">
                {postalCode && (
                  <span className="text-sm font-medium">{postalCode}</span>
                )}
                {city && <span className="text-sm font-medium">{city}</span>}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-[0px] col-span-3">
            {companyName && (
              <span className="text-sm font-medium">{companyName}</span>
            )}
            <div className="flex gap-1">
              {gender && (
                <span className="text-sm font-medium">
                  {
                    langContent[language as keyof typeof langContent]?.gender[
                      gender as keyof typeof GenderLabel
                    ]
                  }
                </span>
              )}
              <span className="text-sm font-medium">{name}</span>
            </div>

            {streetWithNumber && (
              <span className="text-sm font-medium">{streetWithNumber}</span>
            )}
            <div className="flex gap-1">
              {postalCode && (
                <span className="text-sm font-medium">{postalCode}</span>
              )}
              {city && <span className="text-sm font-medium">{city}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-y-[0px] col-span-1 ml-[6px]">
            {email && (
              <div className="space-x-0">
                <span className=" text-sm font-medium">{email}</span>
              </div>
            )}
            {phone !== "+" && phone && (
              <div className="space-x-0">
                <span className="text-sm font-medium">{phone}</span>
              </div>
            )}
            {mobile !== "+" && mobile && (
              <div className="space-x-0">
                <span className="text-sm font-medium">{mobile}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
