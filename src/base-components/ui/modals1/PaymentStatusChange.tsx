import Image from "next/image";
import { BaseModal } from "../modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useAppSelector } from "@/hooks/useRedux";
import { Button } from "../button/button";

export interface PaymentStatusModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onPaidDate: (id: string, status: string) => void;
  heading: string;
}

export const PaymentStatusChange = ({
  onClose,
  onSuccess,
  heading,
  onPaidDate,
}: PaymentStatusModalProps) => {
  const { id, status } = useAppSelector((state) => state.global.modal.data);
  const { loading } = useAppSelector((state) => state.invoice);

  const newStatus = status === "Pending" ? "Paid" : "Pending";

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[340px] xMini:max-w-[524.862px] min-h-fit"
    >
      <div className="relative flex flex-col items-center px-6">
        <Image
          src={crossIcon}
          onClick={onClose}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
        />
        <p className="font-medium mt-5 text-base xMini:text-2xl xMini:mt-8 text-center">
          {heading}
        </p>

        <p className="text-base font-medium text-gray text-center my-[26px]">
          {translate("common.are_sure_payment_status")} '
          {translate(`common.${newStatus}`)}'?
        </p>

        <div className="flex gap-[33px] mb-[38px]">
          <button
            onClick={onClose}
            className="!h-[50px w-[120px] text-[#fff] bg-[#FF0000] rounded-md hover:bg-buttonHover"
          >
            {translate("common.cancel_button")}
          </button>

          <Button
            onClick={() => onPaidDate(id, newStatus)}
            className="!h-[50px] w-[120px] !text-[#fff] bg-[#45C769] rounded-md hover:bg-buttonHover"
            text={translate("common.yes")}
            id="status change"
            inputType="button"
            iconAlt="button"
            loading={loading}
          />
        </div>
      </div>
    </BaseModal>
  );
};
