import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useRejectOffer } from "@/hooks/modals/useRejectOffer";
import { onRejectProps } from "@/types/global";

const RejectOffer = ({ onClose }: onRejectProps) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useRejectOffer();

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[320px] md:max-w-[480px] lg:max-w-[624px] min-h-auto max-h-fit"
    >
      <div className="relative flex flex-col px-[26px] pt-5 pb-[36px]">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <p className="text-base md:text-2xl font-normal md:font-medium border-b border-b-[#000] border-opacity-10 pb-2">
          {translate("rejected_offer.heading")}
        </p>

        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </BaseModal>
  );
};

export default RejectOffer;
