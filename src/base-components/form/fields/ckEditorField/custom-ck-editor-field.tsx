import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CKEditorBoxProps } from "@/types";
import CustomEditor from "@/base-components/ui/editor/ckeditor/build/ckeditor";

const CustomCKEditor = ({
  id,
  field,
  trigger,
  data,
  isTaskEditor,
}: CKEditorBoxProps) => {
  return (
    <CKEditor
      id={id}
      editor={CustomEditor}
      data={field.value}
      key={data}
      onReady={(editor) => {
        field.onChange(field.value);

        const ckContent = editor.ui.getEditableElement();

        if (isTaskEditor && ckContent) {
          // Apply the custom class initially
          ckContent.classList.add("custom-task-content");

          // Ensure the class persists with a MutationObserver
          const observer = new MutationObserver(() => {
            if (!ckContent.classList.contains("custom-task-content")) {
              ckContent.classList.add("custom-task-content");
            }
          });

          observer.observe(ckContent, {
            attributes: true, // Watch for attribute changes
            attributeFilter: ["class"], // Specifically monitor the "class" attribute
          });

          // Reapply class on specific CKEditor events
          editor.model.document.on("change:data", () => {
            ckContent.classList.add("custom-task-content");
          });

          editor.editing.view.document.on("blur", () => {
            ckContent.classList.add("custom-task-content");
          });

          editor.editing.view.document.on("focus", () => {
            ckContent.classList.add("custom-task-content");
          });

          // Cleanup the observer when the editor is destroyed
          editor.on("destroy", () => {
            observer.disconnect();
          });
        }
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
            "fontsize",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "|",
            "link",
            "blockQuote",
            "|",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        placeholder: translate("common.editor_placeholder"),
      }}
    />
  );
};

export default CustomCKEditor;
