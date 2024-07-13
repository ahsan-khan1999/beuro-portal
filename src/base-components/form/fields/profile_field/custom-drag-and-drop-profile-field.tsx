import React, { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useAppDispatch } from "@/hooks/useRedux";
import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";
import Image from "next/image";
import edit_circle from "@/assets/svgs/edit_circle.svg";
import { combineClasses } from "@/utils/utility";
import { useTranslation } from "next-i18next";

export interface ProfileUploadFieldProps {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  className?: string;
  iconClasses?: string;
  disabled?: boolean;
  isMailSetting?: boolean;
}

export const ProfileUpload = ({
  id,
  field,
  className,
  iconClasses,
  disabled,
  isMailSetting,
}: ProfileUploadFieldProps) => {
  const dispatch = useAppDispatch();
  const formdata = new FormData();
  const { t: translate } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (isMailSetting && file.name.endsWith(".svg")) {
        setErrorMessage(translate("common.svg_upload_not_allowed"));
        return;
      }

      if (file.type === "image/webp") {
        setErrorMessage(translate("common.img_upload_error_message"));
        return;
      }

      setErrorMessage(""); // Clear error message if the file type is valid
      formdata.append("file", file);
      const res = await dispatch(uploadFileToFirebase(formdata));
      field.onChange(res?.payload);
    }
  };

  const defaultClasses = `relative`;
  const classes = combineClasses(defaultClasses, className);

  const isSVG = field?.value?.endsWith(".svg");

  return (
    <div>
      <label htmlFor={id}>
        <div className="w-full">
          {field.value ? (
            <div className={`${classes}`}>
              {isSVG ? (
                <object
                  data={field.value}
                  width={241}
                  height={241}
                  className={`${classes} object-contain`}
                />
              ) : (
                <Image
                  src={field.value}
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
            <div className={`${classes} cursor-pointer`}>
              {/* <Image src={profile} alt="profile" /> */}
              <label className={`absolute ${iconClasses}`}>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelected}
                  disabled={disabled}
                />
                <Image src={edit_circle} alt="editIcon" />
              </label>
            </div>
          )}
        </div>

        <input
          id={id}
          type="file"
          className="hidden"
          onChange={handleFileSelected}
          disabled={disabled}
        />
      </label>
      {errorMessage && <p className="text-red text-sm mt-2">{errorMessage}</p>}
    </div>
  );
};
