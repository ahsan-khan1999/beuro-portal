import Image from "next/image";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import fileUploadIcon from "@/assets/svgs/file_uplaod.svg";
import pdfIcon from "@/assets/svgs/PDF_file_icon.svg";
import deletePdfIcon from "@/assets/svgs/delete_file.svg";
import { useRouter } from "next/router";

export const PdfFileUpload = ({
  id,
  field,
  text,
  fileSupported,
}: {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  text?: string;
  fileSupported?: string;
}) => {
  const router = useRouter();
  const formdata = new FormData();
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(
    null
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileInput = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();

    let file: File | null = null;

    if (e instanceof DragEvent && e.dataTransfer) {
      // Handle the drag-and-drop event and ensure e.dataTransfer is not null
      file = e.dataTransfer.files[0];
    } else if (e.target instanceof HTMLInputElement) {
      // Handle the file input change event
      file = e.target.files ? e.target.files[0] : null;
    }

    if (file) {
      formdata.append("file", file);
      // const res = await dispatch(uploadFileToFirebase(formdata));

      // Store the file name locally
      setUploadedImages([...uploadedImages, file.name]);
      // setSelectedImagePath(res?.payload);
      // setSelectedImagePath(URL.createObjectURL(file));

      field.onChange(file.name);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    // Remove the file from the uploadedImages state and update the field
    const updatedImages = uploadedImages.filter((item) => item !== fileName);
    setUploadedImages(updatedImages);
    field.onChange(updatedImages.join(", ")); // Update the field with the remaining file names

    // You may also want to add a server request here to delete the file from the server
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
        {uploadedImages.length > 0 &&
          uploadedImages.map((item, index) => (
            <div
              className="relative flex flex-col gap-3 w-[250px] h-fit border border-[#EBEBEB] rounded-md px-3 py-2 cursor-pointer"
              key={index}
              onClick={() => router.push("/content/pdf-preview")}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={deletePdfIcon}
                  alt="deletePdfIcon"
                  className="absolute -right-1 -top-1 cursor-pointer "
                  onClick={() => handleDeleteFile(item)}
                />
                <Image src={pdfIcon} alt="pdfIcon" />
                <span>{item}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
