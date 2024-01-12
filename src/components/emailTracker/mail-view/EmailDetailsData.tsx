import { TableRowEmailTracker } from "@/types/emailTracker";
import { useTranslation } from "next-i18next";
import React from "react";

const EmailDetailsData = ({
  emailDetails,
}: {
  emailDetails: TableRowEmailTracker | null;
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="bg-white rounded-md px-5 pt-5 pb-10 w-full">
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-[2rem] leading-8 font-medium">
          {translate("email_tracker.email_detail_heading")}
        </h2>
      </div>

      {emailDetails && (
        <div
          className="html-content my-5 flex flex-col gap-y-5 break-all"
          dangerouslySetInnerHTML={{ __html: emailDetails?.description }}
        />
      )}
    </div>
  );
};

export default EmailDetailsData;
