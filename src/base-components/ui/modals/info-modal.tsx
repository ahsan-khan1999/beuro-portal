import { IInfoModalProps } from "@/types";
import { BaseModal } from "./base-modal";
import { ModalCrossIcon } from "@/assets/svgs/components/sideBar/modal-cross-icon";

export const InfoModal = ({
  modalTitle,
  children,
  onClose,
  containerClassName,
}: IInfoModalProps) => {
  return (
    <BaseModal onClose={onClose} containerClassName={containerClassName}>
      <div className="flex justify-between border-b-2 pb-5 border-slate-gray border-opacity-20">
        <h1 className="text-dark font-semibold">{modalTitle}</h1>
        <button
          className="flex items-center justify-center bg-lightBlue w-6 h-6 rounded-full text-medium-gray font-medium"
          onClick={onClose}
        >
          <ModalCrossIcon />
        </button>
      </div>
      {children}
    </BaseModal>
  );
};
