import { BaseButton } from "@/components/ui/button/base-button";
import { IConfirmationModalProps } from "@/types";
import { ConfirmationBaseModal } from "./confirmation-base-modal";

export const ConfirmationStatusModal = ({
  onCancel,
  imageSrc,
  imageAlt,
  children,
  containerClassName,
}: IConfirmationModalProps) => {
  return (
    <ConfirmationBaseModal
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      onCancel={onCancel}
      containerClassName={containerClassName}
    >
      {children}
      <div className="flex justify-center gap-x-4 mt-[33px] w-full">
        <BaseButton
          buttonText="Schließen"
          onClick={onCancel}
          containerClassName="max-w-[376px] w-full"
        />
      </div>
    </ConfirmationBaseModal>
  );
};
