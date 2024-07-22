import { CheckBoxProps } from "@/types";
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
}: CheckBoxProps) => {
  const containerDefaultClasses = "flex items-center gap-x-[12px]";
  const containerClasses = combineClasses(
    containerDefaultClasses,
    containerClassName
  );

  return (
    <label htmlFor={id}>
      <div className={`${containerClasses}`}>
        <div className="flex items-center">
          <input id={id} type="checkbox" {...register(name)} className={``} />
        </div>
        <span className={`${textClassName} text-sm`}>{description}</span>
      </div>
    </label>
  );
};
