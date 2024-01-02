import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useUploadImageOffer } from "@/hooks/modals/useUploadImageOffer";

const ImagesUploadOffer = ({
  onClose,
  handleImageSlider,
  type
}: {
  handleImageSlider: Function,
  onClose: () => void;
  type:string
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useUploadImageOffer(handleImageSlider,type);
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
          <div className="flex justify-between items-center mb-5 ">
            <p className="text-[24px] leading-6 font-medium text-[#000]">
              Images
            </p>
          </div>
          <hr className="opacity-10 " />

          <div className="flex flex-col gap-y-2 my-5 ">
            <h2 className="text-base font-medium text-[#393939]">
              7 images uploaded
            </h2>
            <p className="text-xs font-normal text-[#8F8F8F]">
              Images should be max 20, file size up to 10MB.
            </p>
          </div>
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

export default ImagesUploadOffer;
