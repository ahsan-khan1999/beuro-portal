import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { uploadMultiFileToFirebase } from "@/api/slices/globalSlice/global";
import { useAppDispatch } from "@/hooks/useRedux";
import { Attachement } from "@/types/global";
import { combineClasses, getFileNameFromUrl } from "@/utils/utility";
import imgDelete from "@/assets/svgs/img_delete.svg";
import { Button } from "@/base-components/ui/button/button";

export interface CustomFileUploadProps {
  id: string;
  text?: string;
  fileSupported?: string;
  isOpenedFile?: boolean;
  attachements: Attachement[];
  setAttachements?: (attachement?: Attachement[]) => void;
  isAttachement?: boolean;
}

export const CustomFileUploadField = ({
  id,
  text,
  fileSupported,
  isOpenedFile,
  attachements,
  setAttachements,
  isAttachement,
}: CustomFileUploadProps) => {
  const router = useRouter();
  const formdata = new FormData();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>
  ) => {
    e?.preventDefault();

    let files: FileList | null = null;

    if (e instanceof DragEvent && e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e?.target instanceof HTMLInputElement && e?.target?.files) {
      files = e.target.files;
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("files", files[i]);
      }

      const response = await dispatch(uploadMultiFileToFirebase(formdata));

      let newAttachement = (attachements && [...attachements]) || [];
      if (response?.payload) {
        response?.payload?.forEach((element: any) => {
          newAttachement.push({
            name: getFileNameFromUrl(element),
            value: element,
          });
        });
        setAttachements && setAttachements(newAttachement);
      }
    }
  };

  //   const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  //     e.preventDefault();
  //   };

  //   const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
  //     e.preventDefault();
  //     handleFileInput(e);
  //   };

  const handleDeleteFile = (index: number) => {
    const list = attachements && [...attachements];
    list?.splice(index, 1);
    setAttachements && setAttachements(list);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const defaultClasses = combineClasses(
    "bg-[#EDF4FF] flex flex-col items-center justify-center w-full p-3"
  );

  return (
    <>
      <div className={defaultClasses}>
        {/* <label
        htmlFor={id}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={defaultClasses}
      > */}
        <div className="flex flex-col items-center gap-x-3 gap-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="mt-4"
          >
            <path
              d="M47.6954 37.0312C48.6799 37.0312 49.4532 36.2577 49.4532 35.2734V33.0586L40.6642 14.1797L25.485 17.9745C26.1904 16.879 26.6017 15.5769 26.6017 14.1797C26.6017 10.3018 23.4465 7.14844 19.5704 7.14844C15.6943 7.14844 12.5392 10.3018 12.5392 14.1797C12.5392 16.8103 13.9921 19.1061 16.1361 20.3118L12.5392 21.2109L0.351562 44.0977C1.0548 46.1366 2.98828 47.5781 5.27355 47.5781H37.1486C38.133 47.5781 38.9064 46.8046 38.9064 45.8203C38.9064 40.9688 42.8439 37.0312 47.6954 37.0312ZM53.683 43.3467L50.2944 39.9718C49.6538 39.1726 48.6257 38.7994 47.6954 38.7994C46.6075 38.7994 45.5985 39.333 45.2235 39.8311L41.7422 43.3141C40.2759 44.6996 40.3563 47.021 41.6769 48.2614C42.3224 48.9445 43.2356 49.3359 44.1798 49.3359C44.1798 51.3066 45.7248 52.8516 47.6954 52.8516C49.6661 52.8516 51.2111 51.3066 51.2111 49.3359C52.1896 49.3359 53.1165 48.9308 53.6487 48.3266C55.0928 46.9618 55.0655 44.6528 53.683 43.3467Z"
              fill="white"
            />
            <path
              d="M38.5213 19.4093L49.4531 33.0586V7.14844C49.4531 4.23598 47.0921 1.875 44.1797 1.875H5.27344C2.36098 1.875 0 4.23598 0 7.14844V42.3047C0 42.9375 0.105586 43.535 0.351445 44.0977L14.6823 26.4451C15.3857 25.5643 16.7244 25.5637 17.4285 26.4439L22.4164 32.6788C23.1202 33.5584 24.458 33.5584 25.1617 32.6788L35.7765 19.4101C36.48 18.5307 37.8173 18.5304 38.5213 19.4093ZM19.5703 19.4531C16.6522 19.4531 14.2969 17.0975 14.2969 14.1797C14.2969 11.2616 16.6522 8.90625 19.5703 8.90625C22.4884 8.90625 24.8438 11.2616 24.8438 14.1797C24.8438 17.0975 22.4884 19.4531 19.5703 19.4531ZM47.6953 33.5156C40.9102 33.5156 35.3906 39.0352 35.3906 45.8203C35.3906 52.6055 40.9102 58.125 47.6953 58.125C54.4805 58.125 60 52.6055 60 45.8203C60 39.0352 54.4805 33.5156 47.6953 33.5156ZM52.4413 47.0507C51.8089 47.7538 50.6132 47.754 49.9805 47.0507L49.453 46.5585V49.3359C49.453 50.3202 48.6797 51.0938 47.6952 51.0938C46.7107 51.0938 45.9374 50.3202 45.9374 49.3359V46.5585L45.4099 47.0507C44.742 47.7538 43.6172 47.7538 42.9491 47.0507C42.246 46.3827 42.246 45.2577 42.9491 44.5897L46.4647 41.0741C46.9879 40.42 48.3551 40.3608 48.9255 41.0741L52.4412 44.5897C53.1445 45.2577 53.1445 46.3827 52.4413 47.0507Z"
              fill="#4A13E7"
            />
          </svg>

          <Button
            inputType="button"
            onClick={triggerFileInput}
            className="!h-fit py-4 px-5 mb-4 flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap w-[98px]"
            text={translate("common.upload_button")}
            id="upload"
            iconAlt="upload"
          />
        </div>

        <input
          ref={fileInputRef}
          id={id}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          multiple
        />
        {/* </label> */}
      </div>
      {attachements?.length > 0 && (
        <div className="col-span-2">
          <div className="grid mlg:grid-cols-5 xLarge:grid-cols-5 gap-x-4 gap-y-3">
            {attachements &&
              attachements?.map((item, index) => {
                const isSVG = item?.value?.endsWith(".svg");

                return (
                  <div
                    className={`relative flex flex-col gap-3 h-fit border border-[#EBEBEB] rounded-md px-3 py-2 break-all ${
                      isOpenedFile ? "cursor-pointer" : "cursor-default"
                    }`}
                    key={index}
                    onClick={() =>
                      isOpenedFile && router.push("/content/pdf-preview")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div style={{ position: "relative" }}>
                        {isSVG ? (
                          <object
                            data={item.value}
                            width={100}
                            height={100}
                            style={{ height: "100px", width: "100px" }}
                          />
                        ) : (
                          <Image
                            src={item?.value}
                            width={100}
                            height={100}
                            alt="Uploaded Preview"
                            style={{ height: "100px", width: "100px" }}
                            className="cursor-pointer"
                          />
                        )}
                        <div
                          className="absolute top-[5px] right-[5px] cursor-pointer"
                          onClick={(e) => handleDeleteFile(index)}
                        >
                          <Image src={imgDelete} alt="imgDelete" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
