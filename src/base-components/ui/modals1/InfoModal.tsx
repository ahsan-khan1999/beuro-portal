import { InfoModalProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { BaseModal } from "../modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";

export const InfoModal = ({
  modalTitle,
  children,
  onClose,
  containerClassName,
  infoModalClassName,
}: InfoModalProps) => {
  const infoModalDefaultClassname =
    "flex justify-between  pb-1 border-slate-gray border-opacity-20";
  const infoModalClasses = combineClasses(
    infoModalDefaultClassname,
    infoModalClassName
  );
  return (
    <BaseModal onClose={onClose} containerClassName={containerClassName}>
      <div className={infoModalClasses}>
        <h2 className="font-bold color-[#272727]">{modalTitle}</h2>
        <button
          className="flex items-center justify-center bg-transparent w-6 h-6 rounded-full text-medium-gray font-medium"
          onClick={onClose}
        >
          <Image src={crossIcon} alt="close" width={16} height={16} />
        </button>
      </div>
      {children}
    </BaseModal>
  );
};
