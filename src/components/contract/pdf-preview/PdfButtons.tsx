import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const PdfButtons = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div className="flex gap-5 my-[30px]">
      <button
        onClick={() => router.push("/contract/details")}
        className="border border-[#C7C7C7] rounded-md bg-white text-base font-medium text-[#1E1E1E] py-[10px] px-4"
      >
        {translate("common.PDF_BUTTONS.back_button")}
      </button>
      <button className="border border-[#C7C7C7] rounded-md bg-[#4A13E7] text-base font-medium text-[#fff] py-[10px] px-4">
        {translate("common.PDF_BUTTONS.send_via_email")}
      </button>
      <button className="border border-[#C7C7C7] rounded-md bg-[#4A13E7] text-base font-medium text-[#fff] py-[10px] px-4">
        {translate("common.PDF_BUTTONS.send_via_post")}
      </button>
    </div>
  );
};

export default PdfButtons;
