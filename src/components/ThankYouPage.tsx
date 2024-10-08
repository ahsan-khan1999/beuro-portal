import Image from "next/image";
import aggrementIcon from "@/assets/pngs/agreement_icon.png";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const ThankYouPage = () => {
  const { t: translate } = useTranslation();

  const router = useRouter();

  const company_name = router?.query?.companyName;
  return (
    <div className="w-full px-5 sm:w-[600px] sm:py-[53px] sm:px-[60px]">
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
        <h1 className="text-[#393939] font-semibold sm:font-bold text-lg sm:text-2xl text-center mb-5 mt-[60px]">
          {translate("thank_you_content.heading")}
        </h1>
      </div>

      <div className="flex flex-col">
        <span className="text-sm sm:text-base font-normal text-left">
          {translate("thank_you_content.valued_csutomer")},
        </span>

        <p className="text-sm sm:text-base font-normal text-justify mt-3">
          {translate("thank_you_content.description_1")}
        </p>
        <p className="text-sm sm:text-base font-normal text-justify my-3">
          {translate("thank_you_content.description_2")}
        </p>
        <p className="text-sm sm:text-base font-normal text-justify">
          {translate("thank_you_content.description_3")}
        </p>

        <span className="text-sm sm:text-base font-normal mt-5">
          {translate("thank_you_content.warm_regards")},
        </span>
        <div className="flex items-center gap-x-1">
          <span className="text-sm sm:text-base font-normal text-primary">
            {translate("thank_you_content.your")}
          </span>
          <span className="text-sm sm:text-base font-normal text-primary">
            {company_name}
          </span>
          <span className="text-sm sm:text-base font-normal text-primary">
            {translate("thank_you_content.team")}
          </span>
        </div>
      </div>
    </div>
  );
};
