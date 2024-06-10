import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CKEditorBoxProps } from "@/types";
import CustomEditor from "@/base-components/ui/editor/ckeditor/build/ckeditor";

const CustomCKEditor = ({
  id,
  field,
  trigger,
  data,
  name,
  type,
}: CKEditorBoxProps) => {
  return (
    <CKEditor
      id={id}
      editor={CustomEditor}
      data={field.value}
      key={data}
      onReady={(editor) => {
        field.onChange(field.value);
      }}
      onChange={(event, editor) => {
        field.onChange(editor.getData());
      }}
      onBlur={(event, editor) => {}}
      onFocus={(event, editor) => {}}
      onError={(error, errorDetails) => {
        trigger?.(field.name);
      }}
      config={{
        language: "de",

        toolbar: {
          items: [
            "exportPdf",
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            // "fontfamily",
            "fontsize",
            // "fontColor",
            // "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            // "underline",
            "strikethrough",
            // "subscript",
            // "superscript",
            // "code",
            "|",
            // "alignment",
            "link",
            "blockQuote",
            // "codeBlock",
            "|",
            "bulletedList",
            "numberedList",
            // "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        placeholder: translate("common.editor_placeholder"),
        // exportPdf: {
        //   stylesheets: ["EDITOR_STYLES"],
        //   fileName: "talha.pdf",
        //   converterUrl: "https://pdf-converter.cke-cs.com/v1/convert",
        //   converterOptions: {
        //     format: "A4",
        //     margin_top: "10mm",
        //     margin_bottom: "10mm",
        //     margin_right: "10mm",
        //     margin_left: "10mm",
        //     page_orientation: "portrait",
        //     header_html: undefined,
        //     footer_html: undefined,
        //     header_and_footer_css: undefined,
        //     wait_for_network: true,
        //     wait_time: 0,
        //   },
        //   dataCallback: (editor) => editor.getData(),
        // },
      }}
    />
  );
};
export default CustomCKEditor;
