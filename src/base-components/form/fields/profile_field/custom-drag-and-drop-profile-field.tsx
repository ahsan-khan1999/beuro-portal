import React, { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useAppDispatch } from "@/hooks/useRedux";
import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";
import Image from "next/image";
import edit_circle from "@/assets/svgs/edit_circle.svg";
import { combineClasses } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import fileUploadIcon from "@/assets/pngs/file-upload-icon.png";

export interface ProfileUploadFieldProps {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  className?: string;
  iconClasses?: string;
  disabled?: boolean;
  isMailSetting?: boolean;
  isMailField?: boolean;
}

export const ProfileUpload = ({
  id,
  field,
  className,
  iconClasses,
  disabled,
  isMailSetting,
  isMailField,
}: ProfileUploadFieldProps) => {
  const dispatch = useAppDispatch();
  const formdata = new FormData();
  const { t: translate } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (
        isMailField &&
        (file.name.endsWith(".svg") || file.type === "image/webp")
      ) {
        setErrorMessage(translate("common.img_upload_error_message"));
        return;
      }

      setErrorMessage("");
      formdata.append("file", file);
      const res = await dispatch(uploadFileToFirebase(formdata));
      field.onChange(res?.payload);
    }
  };

  const defaultClasses = `relative`;
  const classes = combineClasses(defaultClasses, className);

  const isSVG =
    typeof field?.value === "string" && field.value.endsWith(".svg");

  return (
    <div>
      {/* <label> */}
      <div className="w-full">
        {field?.value ? (
          <div className={`${classes}`}>
            {isSVG ? (
              <object
                data={field?.value}
                width={241}
                height={241}
                className={`${classes} object-contain`}
              />
            ) : (
              <Image
                src={field?.value}
                layout="responsive"
                width={241}
                height={241}
                alt="Uploaded Preview"
                key={Math.random()}
                className={`${classes} object-contain`}
              />
            )}

            <label
              className={`absolute ${iconClasses} ${disabled && "hidden"}`}
            >
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelected}
                disabled={disabled}
              />

              <Image
                src={edit_circle}
                alt="editIcon"
                className="cursor-pointer"
              />
            </label>
          </div>
        ) : (
          <div className={`${classes} flex justify-center items-center`}>
            <input
              id={id}
              type="file"
              className="hidden"
              onChange={handleFileSelected}
              disabled={disabled}
            />
            <label className={`absolute`}>
              <div className="flex flex-col items-center gap-y-[10px]">
                <Image src={fileUploadIcon} alt="editIcon" />
                <span
                  className="bg-primary px-3 py-2 cursor-pointer text-white text-sm font-medium rounded-lg"
                  onClick={() => document.getElementById(id)?.click()}
                >
                  {translate("common.upload_button")}
                </span>
              </div>
            </label>
          </div>
        )}
      </div>
      {/* </label> */}
      {errorMessage && <p className="text-red text-sm mt-2">{errorMessage}</p>}
    </div>
  );
};
