import { detailScreenCardsLayout } from "@/types";
import companyIcon from "@/assets/svgs/company-details.svg";
import locationIcon from "@/assets/svgs/location-details.svg";
import bankIcon from "@/assets/svgs/bank-details.svg";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export const DetailScreensCard = ({
  children,
  currentFormStage,
}: detailScreenCardsLayout) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex flex-col justify-center min-h-screen mx-10">
      <div className="h-[633px]">
        <div className="mx-auto max-w-[890px] w-full rounded-2xl    shadow-loginCard bg-white">
          <div className="grid grid-cols-3 bg-[#FAFAFA] rounded-tl-2xl rounded-tr-2xl min-w-full">
            <div
              className={`flex justify-center items-center pl-[53px] pr-11 py-4 ${
                currentFormStage?.includes("companyDetails") &&
                "rounded-r-[24px]"
              } bg-gradient-pricingCards  rounded-tl-2xl cursor-pointer w-full`}
            >
              <Image
                src={companyIcon}
                alt="Company Icon"
                className="mr-[10px]"
              />
              <h2 className="text-sm text-white font-semibold tracking-[0.42px]">
                {translate("login_detail.tabs_heading.company")}
              </h2>
            </div>
            <div
              className={`flex  justify-center items-center py-4 mx-auto cursor-pointer w-full ${
                (currentFormStage?.includes("locationDetails") ||
                  currentFormStage?.includes("bankDetails")) &&
                "bg-gradient-pricingCards "
              }
            ${
              currentFormStage?.includes("locationDetails") &&
              "rounded-r-[24px]"
            }`}
            >
              <Image
                src={locationIcon}
                alt="Location Icon"
                className="mr-[10px]"
              />
              <h2
                className={`text-sm  ${
                  currentFormStage?.includes("companyDetails")
                    ? "text-[#B9B9B9]"
                    : "text-white"
                } font-semibold tracking-[0.42px]`}
              >
                {translate("login_detail.tabs_heading.location")}
              </h2>
            </div>
            <div
              className={`flex justify-center items-center py-4 mx-auto cursor-pointer w-full rounded-tr-2xl ${
                currentFormStage?.includes("bankDetails") &&
                "bg-gradient-pricingCards"
              }`}
            >
              <Image src={bankIcon} alt="Bank Icon" className="mr-[10px]" />
              <h2
                className={`text-sm  ${
                  currentFormStage?.includes("bankDetails")
                    ? "text-white"
                    : "text-[#B9B9B9]"
                } font-semibold tracking-[0.42px]`}
              >
                {translate("login_detail.tabs_heading.bank")}
              </h2>
            </div>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};
