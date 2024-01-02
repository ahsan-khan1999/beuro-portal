import Image from "next/image";
import React from "react";
import atmCardIcon from "@/assets/svgs/bank-name.svg";
import editInfoIcon from "@/assets/svgs/edit_info.svg";
import { useTranslation } from "next-i18next";

const UpgradeSection = ({
  handleEditPayment,
}: {
  handleEditPayment: () => void;
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col">
      <section
        className="flex flex-col p-[25px] rounded-[10px]"
        style={{
          background: "linear-gradient(180deg, #4A13E7 12.45%, #7B18FF 63.46%)",
        }}
      >
        <p className="text-xl text-white font-medium">
          {translate("setting.billing.upgrade_card.heading")}
        </p>
        <p className="text-sm text-white font-normal mt-3">
        {translate("setting.billing.upgrade_card.description")}
        </p>

        <button className="text-base font-medium text-[#4A13E7] bg-white w-full rounded-lg mt-5 p-4">
        {translate("setting.billing.upgrade_card.button")}
        </button>
      </section>

      <section className="bg-white p-4 rounded-md mt-[18px]">
        <div className="flex flex-col gap-y-2">
          <p className="text-base font-normal text-[#4B4B4B]">{translate("setting.billing.payment_method")}</p>
          <p className=" bg-[#5488EE] rounded-md px-3 py-1 w-fit bg-opacity-20">
            <span className="text-[#4B4B4B] font-normal text-xs">
            {translate("setting.billing.next_renew")}
            </span>
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-x-6">
            <Image src={atmCardIcon} alt="atmCardIcon" className="w-[27px]" />
            <p className="flex flex-col">
              <span className="text-xm font-medium text-[#4B4B4B]">{translate("setting.billing.card_type")}</span>
              <span className="text-base font-medium text-[#4B4B4B]">
                **********13165
              </span>
            </p>
          </div>
          <Image
            src={editInfoIcon}
            alt="editInfoIcon"
            className="cursor-pointer"
            onClick={handleEditPayment}
          />
        </div>
      </section>
    </div>
  );
};

export default UpgradeSection;
