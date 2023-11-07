import { IConfirmationModalProps } from "@/types";
import { ConfirmationBaseModal } from "./confirmation-base-modal";
import { BaseButton } from "../../button/base-button";

export const ConfirmationPromptModal = ({
  onCancel,
  onProceed,
  imageSrc,
  imageAlt,
  children,
  containerClassName,
}: IConfirmationModalProps) => {
  return (
    <ConfirmationBaseModal imageSrc={imageSrc} imageAlt={imageAlt} onCancel={onCancel} containerClassName={containerClassName}>
      {children}
      <div className="flex justify-center gap-x-4 mt-[33px]">
        <BaseButton
          buttonText="Abbrechen"
          onClick={onCancel}
          containerClassName="w-[180px]"
        />
        <BaseButton
          buttonText="Löschen"
          onClick={onProceed}
          containerClassName="w-[180px] bg-red"
          textClassName="text-white"
        />
      </div>
    </ConfirmationBaseModal>
  );
};
