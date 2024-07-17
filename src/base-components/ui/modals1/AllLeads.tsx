import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import AllLeadsTable from "@/components/follow-up/all-leads";
import { AllLeadsProps } from "@/types/follow-up";

const AllLeads = ({ onClose, handleLeadDetail }: AllLeadsProps) => {
  return (
      <BaseModal
        onClose={onClose}
        containerClassName="w-full max-w-[1209.603px] min-h-[752.521px] max-h-[752.521px] overflow-scroll"
      >
        <div className="relative flex flex-col pl-[39px] pt-[38px] pb-5 pr-[26px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <AllLeadsTable handleLeadDetail={handleLeadDetail} />
        </div>
      </BaseModal>
  );
};

export default AllLeads;
