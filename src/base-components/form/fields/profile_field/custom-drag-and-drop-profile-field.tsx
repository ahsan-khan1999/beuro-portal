import React, { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useAppDispatch } from "@/hooks/useRedux";
import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";
import Image from "next/image";
import edit_circle from "@/assets/svgs/edit_circle.svg";
import profile from "@/assets/svgs/Group 480958610.svg";
import { combineClasses } from "@/utils/utility";

export const ProfileUpload = ({
  id,
  field,
  className,
  iconClasses,
  disabled,
}: {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  className?: string;
  iconClasses?: string;
  disabled?: boolean;
}) => {
  // const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const formdata = new FormData();

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      formdata.append("file", file);
      const res = await dispatch(uploadFileToFirebase(formdata));
      field.onChange(res?.payload);
    }
  };

  const defaultClasses = `relative`;
  const classes = combineClasses(defaultClasses, className);

  return (
    <label htmlFor={id}>
      <div className="w-full">
        {field.value ? (
          <div className={`${classes} `}>
            <Image
              src={field.value}
              layout="responsive"
              width={241}
              height={241}
              alt="Uploaded Preview"
              className={`${classes}`}
            />
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
  );
};
