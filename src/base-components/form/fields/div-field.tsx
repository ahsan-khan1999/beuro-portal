import { DivProps, FieldType } from "@/types";
import { getTypedFieldComponent } from "../helpers";
import { combineClasses } from "@/utils/utility";

export const DivField = ({ children, className, errors }: DivProps) => {
  const classes = combineClasses("", className);
  return (
    <div className={classes}>
      {children.map((childField, index) => {
        const fieldName: string | undefined = childField?.field?.name;
        const error =
          errors && fieldName ? errors[fieldName]?.message : undefined;
        const { label, field, containerClass } = childField;
        const renderedField =
          field.type &&
          getTypedFieldComponent(field.type as FieldType, field, error, errors);

        const childClasses = combineClasses(
          "flex flex-col mb-5",
          containerClass
        );
        const labelClasses = combineClasses(
          "text-dark font-medium mb-[10px]",
          label?.className
        );

        return (
          <div key={index} className={`${childClasses}`}>
            {label && (
              <label htmlFor={label.htmlFor} className={` ${labelClasses}`}>
                {label.text}
              </label>
            )}
            {renderedField}
          </div>
        );
      })}
    </div>
  );
};
