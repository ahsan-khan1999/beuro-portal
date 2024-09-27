import { ProfileUploadFieldProps } from "@/types";
import React from "react";
import { Controller } from "react-hook-form";
import { ProfileUpload } from "./custom-drag-and-drop-profile-field";

export const ProfileControllerField = ({
  control,
  id,
  name,
  className,
  iconClasses,
  disabled,
  isMailSetting,
  isMailField,
  isAgent,
}: ProfileUploadFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ProfileUpload
          id={id}
          field={field}
          className={className}
          iconClasses={iconClasses}
          disabled={disabled}
          isMailSetting={isMailSetting}
          isMailField={isMailField}
          isAgent={isAgent}
        />
      )}
    />
  );
};
