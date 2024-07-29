import { CustomCheckBoxFieldProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const CustomCheckBoxField = ({
  id,
  name,
  register,
  className,
  containerClassName,
  textClassName,
  label,
  description,
}: CustomCheckBoxFieldProps) => {
  const containerDefaultClasses = "flex items-center gap-x-[12px]";
  const containerClasses = combineClasses(
    containerDefaultClasses,
    containerClassName
  );

  return (
    <label htmlFor={id}>
      <div className={`${containerClasses}`}>
        <input id={id} type="checkbox" {...register(name)} />
        <span className={`${textClassName} text-sm`}>{description}</span>
      </div>
    </label>
  );
};
