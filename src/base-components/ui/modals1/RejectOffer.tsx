import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useUploadImageOffer } from "@/hooks/modals/useUploadImageOffer";
import { useRejectOffer } from "@/hooks/modals/useRejectOffer";
import { CreateSuccessProps } from "@/types/global";

const RejectOffer = ({
  onClose,
  modelHeading,
  modelSubHeading,
  routeHandler,
}: CreateSuccessProps) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useRejectOffer();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col px-[26px] pt-5 pb-[36px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <p className="text-2xl font-medium text-[#000]">{"Reject Offer"}</p>

          <div className="flex flex-col gap-y-2 my-2 border-t border-[#000] border-opacity-10 pt-5"></div>
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      </BaseModal>
    </>
  );
};

export default RejectOffer;
