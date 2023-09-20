import { CheckBoxProps, InputProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import styles from "./checkbox.module.css";

export const CheckBox = ({
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
    <div className={`${containerClasses}`}>
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          {...register(name)}
          className={`${styles.hiddenCheckbox} checkbox-gradietnt`}
        />
        <label htmlFor={id} className={`${styles.checkboxLabel} `}></label>
        <label htmlFor={id} className="ml-2 cursor-pointer text-sm">
          {label}
        </label>
      </div>
      <span className={`${textClassName} text-sm`}>{description}</span>
    </div>
  );
};
