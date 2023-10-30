import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useAppDispatch } from "@/hooks/useRedux";
import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";
import Image from "next/image";
import edit_circle from "@/assets/svgs/edit_circle.svg";
import profile from "@/assets/pngs/profile.png";

export const ProfileUpload = ({
  id,
  field,
}: {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
}) => {
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

  return (
    <label htmlFor={id}>
      <div className="w-full">
        {field.value ? (
          <Image
            src={field.value}
            layout="responsive" // Allow the image to take full width
            width={300}
            height={148}
            alt="Uploaded Preview"
          />
        ) : (
          <div className="relative w-full h-full">
            {/* Adjust dimensions as needed */}
            <Image src={profile} alt="profile" className="w-full"/>
            <label className="absolute right-0 bottom-0">
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelected}
              />
              <Image
                src={edit_circle}
                alt="editIcon"
                className="cursor-pointer"
              />
            </label>
          </div>
        )}
      </div>

      <input
        id={id}
        type="file"
        className="hidden"
        onChange={handleFileSelected}
      />
    </label>
  );
};
