import { CopyIcon } from "@/assets/svgs/components/copy-icon";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { InputWithCopyProps } from "@/types";
import { useClipboardCopy } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

export const InputFieldWithCopy = ({
  id,
  inputType,
  value,
  name,
  control,
  placeholder,
  className,
  disabled,
}: InputWithCopyProps) => {
  const { inputRef, handleCopy, isCopied } = useClipboardCopy();
  const defaultClasses = `border-2 border-lightGray rounded-lg h-12 w-full ${
    true ? "pl-4 pr-10" : "px-4"
  } py-3 focus:border-primary outline-none`;
  const classes = combineClasses(defaultClasses, className);
  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field, fieldState: { error } }) => (
          <input
            id={id}
            type={inputType}
            {...field}
            placeholder={placeholder}
            className={classes}
            disabled={disabled}
            ref={(e) => {
              field.ref(e);
              inputRef.current = e;
            }}
          />
        )}
      />
      <div className="absolute top-2/4 right-2.5 transform -translate-y-2/4 ">
        <BaseButton
          containerClassName={`flex gap-x-1 ${
            !isCopied ? "bg-lighttest-gray" : "bg-primary"
          } py-1 px-2.5 rounded !!border !!border-lightGray`}
          textClassName={`${
            !isCopied ? "text-primary" : "text-white"
          } font-medium`}
          buttonText={!isCopied ? "Copy" : "Copied"}
          onClick={handleCopy}
        >
          {!isCopied && <CopyIcon />}
        </BaseButton>
      </div>
    </div>
  );
};