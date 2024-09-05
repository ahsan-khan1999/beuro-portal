import { useRouter } from "next/router";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React, { useEffect } from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";
import {
  readContractDetails,
  setContractTaskDetails,
  updateContractStatus,
} from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useDispatch } from "react-redux";
import { ModalType } from "@/enums/ui";
import { staticEnums } from "@/utils/static";
import localStoreUtil from "@/utils/localstore.util";
import { useAppSelector } from "@/hooks/useRedux";
import moment from "moment";
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

  const { contractDetails } = useAppSelector((state) => state.contract);

  useEffect(() => {
    localStoreUtil.remove_data("contractComposeEmail");

    if (contractId) {
      dispatch(readContractDetails({ params: { filter: contractId } }));
    }
  }, [contractId]);

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

      if (contractDetails?.offerID?.date) {
        const updatedDates = contractDetails.offerID.date.map(
          (dateItem: any) => {
            const { startDate, endDate } = dateItem;
            const taskTime = contractDetails?.offerID?.time || "00:00";

            const startMoment = moment(startDate).set({
              hour: parseInt(taskTime.split(":")[0], 10),
              minute: parseInt(taskTime.split(":")[1], 10),
            });

            let endMoment;

            if (endDate) {
              endMoment = moment(endDate)
                .set({
                  hour: parseInt(taskTime.split(":")[0], 10),
                  minute: parseInt(taskTime.split(":")[1], 10),
                })
                .add(1, "hour");
            } else {
              endMoment = startMoment.clone().add(1, "hour");
            }

            return {
              ...dateItem,
              startDate: startMoment.format("YYYY-MM-DDTHH:mm"),
              endDate: endMoment.format("YYYY-MM-DDTHH:mm"),
            };
          }
        );

        dispatch(
          setContractTaskDetails({
            id: "convert",
            colour: "#45C769",
            contractID: {
              id: contractDetails?.id,
            },
            date: updatedDates,
            title: contractDetails?.title,
            isAllDay: false,
            isContractCreated: true,
            type: "Contract",
            alertTime: 15,
            note: contractDetails?.contractNumber,
          })
        );
      }

      if (res?.payload) {
        dispatch(updateModalType(ModalType.NONE));
        router.push(`/calendar?isContractId=${contractId}`);
      }
    }
  };

  const handleCancel = () => {
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
