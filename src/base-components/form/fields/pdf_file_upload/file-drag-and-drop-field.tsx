import Image from "next/image";
import { SetStateAction, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import fileUploadIcon from "@/assets/svgs/file_uplaod.svg";
import pdfIcon from "@/assets/svgs/PDF_file_icon.svg";
import deletePdfIcon from "@/assets/svgs/delete_file.svg";
import { useRouter } from "next/router";
import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";
import { useAppDispatch } from "@/hooks/useRedux";
import { Attachement } from "@/types/global";

export const PdfFileUpload = ({
  id,
  field,
  text,
  fileSupported,
  isOpenedFile,
  attachements,
  setAttachements
}: {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  text?: string;
  fileSupported?: string;
  isOpenedFile?: boolean;
  attachements?: Attachement[];
  setAttachements?: React.Dispatch<SetStateAction<any>>

}) => {
  const router = useRouter();
  const formdata = new FormData();
  const dispatch = useAppDispatch()
  const handleFileInput = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();

    let file: File | null = null;

    if (e instanceof DragEvent && e.dataTransfer) {
      file = e.dataTransfer.files[0];
    } else if (e.target instanceof HTMLInputElement) {
      file = e.target.files ? e.target.files[0] : null;
    }

    if (file) {
      formdata.append("file", file);

      // Store the file name locally
      const response = await dispatch(uploadFileToFirebase(formdata))
      if (response?.payload) {
        setAttachements && setAttachements(attachements && [...attachements, { name: file?.name, value: response?.payload }])
        field.onChange(response?.payload);

      }

    }
  };

  const handleDeleteFile = (index: number) => {
    const list = attachements && [...attachements]
    list?.splice(index, 1)
    setAttachements && setAttachements(list)
    // field.onChange();
  };

  return (
    <div className="flex ">
      <label htmlFor={id} onDragOver={handleFileInput} onDrop={handleFileInput}>
        <div className="flex gap-3">
          <div className="flex flex-col items-center border border-[#8F8F8F] border-dashed rounded-lg w-full h-auto cursor-pointer px-[25px] pt-6 pb-3">
            <Image src={fileUploadIcon} alt="fileUploadIcon" />
            <span className="text-[#4B4B4B] text-center font-medium text-[10px] mt-3 mb-2">
              {text}
            </span>
            <span className="text-[#8F8F8F] font-normal text-[12px]">
              {fileSupported}
            </span>
          </div>
        </div>

        <input
          id={id}
          type="file"
          className="hidden"
          onChange={handleFileInput}
        />
      </label>

      <div className="grid grid-rows-3 grid-flow-col gap-x-4 gap-y-3 mr-4">
        {attachements &&
          attachements?.map((item, index) => (
            <div
              className={`relative flex flex-col gap-3 w-[250px] h-fit border border-[#EBEBEB] rounded-md px-3 py-2 ${isOpenedFile ? "cursor-pointer" : "cursor-default"
                }`}
              key={index}
              onClick={() =>
                isOpenedFile && router.push("/content/pdf-preview")
              }
            >
              <div className="flex items-center gap-3">
                <Image
                  src={deletePdfIcon}
                  alt="deletePdfIcon"
                  className={`absolute -right-1 -top-1 ${isOpenedFile ? "cursor-pointer" : "cursor-pointer"
                    } `}
                  onClick={() => handleDeleteFile(index)}
                />
                <Image src={pdfIcon} alt="pdfIcon" />
                <span>{item?.name}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
