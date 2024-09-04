import { useRouter } from "next/router";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";
import { updateContractStatus } from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useDispatch } from "react-redux";
import { ModalType } from "@/enums/ui";
import { staticEnums } from "@/utils/static";

export interface IsTaskModalProps {
  onClose: () => void;
  heading: string;
  contractId: string | null;
  status: string;
}

export const IsContractTaskCreated = ({
  onClose,
  heading,
  contractId,
  status,
}: IsTaskModalProps) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleConfirm = async () => {
    if (contractId) {
      const res = await dispatch(
        updateContractStatus({
          data: {
            id: contractId,
            contractStatus: staticEnums["ContractStatus"][status],
          },
        })
      );

      if (res?.payload) {
        dispatch(updateModalType(ModalType.NONE));
        router.push(`/calendar?isContractId=${contractId}`);
      }
    }
  };

  const handleCancel = () => {
    // Just close the modal without updating the status
    dispatch(updateModalType(ModalType.NONE));
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[340px] xMini:max-w-[524.862px] min-h-fit"
    >
      <div className="relative flex flex-col items-center px-6 xMini:px-0">
        <Image
          src={createdIcon}
          alt="creation_icon"
          className="mt-10 xMini:mt-50px] w-[70px] h-[70px] xMini:w-fit xMini:h-fit"
        />
        <p className="font-medium mt-5 text-base xMini:text-2xl xMini:mt-8 text-center">
          {heading}
        </p>

        <div className="flex gap-[33px] mt-[26px] mb-[38px]">
          <button
            onClick={handleConfirm}
            className="py-[11px] w-[120px] text-[#fff] bg-[#45C769] rounded-md"
          >
            {translate("common.yes")}
          </button>
          <button
            onClick={handleCancel}
            className="py-[11px] w-[120px] text-[#fff] bg-[#FF0000] rounded-md"
          >
            {translate("common.no")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
