import Image from "next/image";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import fileUploadIcon from "@/assets/svgs/file_uplaod.svg";
import imgDelete from "@/assets/svgs/img_delete.svg";
import { useAppDispatch } from "@/hooks/useRedux";
import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";

export const ImageUpload = ({
  id,
  field,
  text,
  fileSupported,
  onClick,
  value
}: {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  text?: string;
  fileSupported?: string;
  onClick?: Function;
  value?: string
}) => {
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const formdata = new FormData();

    const file = e.dataTransfer.files[0];
    formdata.append("file", file);
    const res = await dispatch(uploadFileToFirebase(formdata));
    field.onChange(res?.payload);
  };

  const handleFileSelected = async (e: any) => {
    const formdata = new FormData();
    const file = e.target.files[0];
    formdata.append("file", file);
    const res = await dispatch(uploadFileToFirebase(formdata));
    field.onChange(res?.payload);
  };
  const deleteImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    field.onChange(null);

  }
  return (
    <>
      <label
        htmlFor={id}
        className="bg-white border-2 border-dashed border-lightGray rounded-lg max-w-[110px] max-h-[100px] py-[20px] px-2 flex flex-col items-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {field.value ? (
          <div className="relative">
            <Image
              src={field.value}
              width={100}
              height={100}
              alt="Uploaded Preview"
              style={{ height: "70px", width: "70px" }}

            />
            <div
              className="absolute top-[5px] right-[5px] "
              onClick={(e) => deleteImage(e)}
            >

              <Image
                src={imgDelete}
                alt="imgDelete"
              />
            </div>
          </div>
        ) : (
          <>
            <Image
              src={fileUploadIcon}
              alt="video upload icon"
              width={32}
              height={26}
            />
            <p className="text-dark  text-xs mt-[10px]">Drop or attach your file here</p>
          </>

        )}

        <input type="file" className="hidden" id={id} onChange={handleFileSelected} />
      </label>
    </>
  );
};
