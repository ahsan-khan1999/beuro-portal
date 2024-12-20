import { CKEditorProps } from "@/types";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";

const CustomCKEditor = dynamic(() => import("./custom-ck-editor-field"), {
  ssr: false,
});

export const CkEditor = ({
  id,
  value: defaultValue,
  control,
  name,
  trigger,
  isTaskEditor,
}: CKEditorProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        return (
          <CustomCKEditor
            field={field}
            trigger={trigger}
            name={name}
            id={id}
            type="Editor"
            data={defaultValue}
            isTaskEditor={isTaskEditor}
          />
        );
      }}
    />
  );
};
