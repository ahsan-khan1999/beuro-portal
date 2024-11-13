import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useRedux";

export interface CreateReportModalProps {
  onClose: () => void;
}

export const CreateReportModal = ({ onClose }: CreateReportModalProps) => {
  const router = useRouter();
  const { id } = useAppSelector((state) => state.global.modal.data);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[360px] md:max-w-[480px] lg:max-w-[624.862px] min-h-fit"
    >
      <div className="relative flex flex-col py-10">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />

        <NoDataEmptyState
          heading={translate("appointments.detail_data.no_report_found")}
          containerClassName="py-0"
        />
      </div>
    </BaseModal>
  );
};
