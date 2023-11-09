import { combineClasses } from "@/utils/utility";
import { renderField } from "./helpers";
import { FormField } from "@/types";

export const RenderFields = ({
  field,
  containerClass,
  label,
  errors,
}: FormField & { errors?: Record<string, any> }) => {
  const fieldName = field?.name;
  const error = errors && fieldName ? errors[fieldName]?.message : undefined;
  const containerClasses = combineClasses(
    "flex flex-col mb-[10px]",
    containerClass
  );
  const labelClasses = combineClasses(
    "text-dark font-medium mb-[10px]",
    label?.className
  );
  return (
    <div className={`${containerClasses}`}>
      {label && (
        <label htmlFor={label.htmlFor} className={`${labelClasses}`}>
          {label?.text}
        </label>
      )}
      {renderField({ field, containerClass, label }, error, errors)}
      
    </div>
  );
};
