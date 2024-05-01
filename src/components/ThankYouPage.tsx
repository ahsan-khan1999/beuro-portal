import Image from "next/image";
import aggrementIcon from "@/assets/pngs/agreement_icon.png";
import { useTranslation } from "next-i18next";

export const ThankYouPage = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="w-[600px] py-[53px] px-[60px]">
      <div
        style={{
          backgroundImage: `url(@/assets/pngs/thank_you_bg.png)`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
        className="flex flex-col items-center justify-center"
      >
        <Image
          src={aggrementIcon}
          alt="aggrementIcon"
          height={100}
          width={100}
        />
        <h1 className="text-[#393939] font-medium md:font-bold text-lg md:text-2xl mb-5 mt-[60px]">
          {translate("thank_you_content.heading")}
        </h1>
      </div>

      <div className="flex flex-col">
        <span className="text-sm md:text-base font-normal text-left">
          {translate("thank_you_content.valued_csutomer")},
        </span>
        <p className="text-sm md:text-base font-normal">
          {translate("thank_you_content.description")}
        </p>

        <span className="text-sm md:text-base font-normal mt-5">
          {translate("thank_you_content.warm_regards")},
        </span>
        <span className="text-sm md:text-base font-normal text-primary">
          {translate("thank_you_content.team")}
        </span>
      </div>
    </div>
  );
};
