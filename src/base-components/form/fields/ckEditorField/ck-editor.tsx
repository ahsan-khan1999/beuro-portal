import { CKEditorProps } from "@/types";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
// import CustomCKEditor from "./custom-ck-editor-field";

const CustomCKEditor = dynamic(() => import("./custom-ck-editor-field"), {
  ssr: false,
});


export const CkEditor = ({
  id,
  value: defaultValue,
  control,
  name,
  trigger,
  className,
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
          />
        )
      }}
    />
  );
};
