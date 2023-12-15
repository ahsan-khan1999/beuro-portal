import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useUploadImage } from "@/hooks/modals/useUploadImage";

const ImagesUpload = ({
  onClose,
  handleImageSlider,
}: {
  handleImageSlider: Function,
  onClose: () => void;
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useUploadImage(handleImageSlider);
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] xl:max-w-[624px] min-h-fit"
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
              {translate("common.images_modal.heading")}
            </p>
          </div>
          <hr className="opacity-10 " />

          <div className="flex flex-col gap-y-2 my-5 ">
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

export default ImagesUpload;
