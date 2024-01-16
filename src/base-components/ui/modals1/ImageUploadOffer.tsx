import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useUploadImageOffer } from "@/hooks/modals/useUploadImageOffer";

const ImagesUploadOffer = ({
  onClose,
  handleImageSlider,
  type,
}: {
  handleImageSlider: Function;
  onClose: () => void;
  type: string;
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useUploadImageOffer(handleImageSlider, type);
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
          <p className="text-2xl font-medium text-[#000]">
            {translate("common.images_modal.heading")}
          </p>

          <div className="flex flex-col gap-y-2 my-5 border-t border-[#000] border-opacity-20 pt-5">
            <h2 className="text-base font-medium text-[#393939]">
              {translate("common.images_modal.title")}
            </h2>
            <p className="text-xs font-normal text-[#8F8F8F]">
              {translate("common.images_modal.sub_title")}
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
