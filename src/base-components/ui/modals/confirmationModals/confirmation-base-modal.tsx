import { BaseModal } from "../base-modal";
import Image from "next/image";
import { IConfirmationBaseModalProps } from "@/types";

export const ConfirmationBaseModal = ({
  onCancel,
  imageSrc,
  imageAlt,
  children,
  containerClassName
}: IConfirmationBaseModalProps) => {
  return (
    <BaseModal
      onClose={onCancel}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-center justify-center">
          <Image src={imageSrc} alt={imageAlt} width={100} height={100} />
        {children}
      </div>
    </BaseModal>
  );
};
