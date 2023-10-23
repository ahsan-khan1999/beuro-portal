import { CKEditorProps } from "@/types";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";

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
      render={({ field, fieldState: { error } }) => (
        <CustomCKEditor field={field} trigger={trigger} name={name} id={id} />
      )}
    />
  );
};
