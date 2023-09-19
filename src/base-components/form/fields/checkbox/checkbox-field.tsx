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
  description,
}: CheckBoxProps) => {
  const containerDefaultClasses = "flex items-center gap-x-[12px]";
  const containerClasses = combineClasses(
    containerDefaultClasses,
    containerClassName
  );
  return (
    <div className={`${containerClasses}`}>
      <div className="flex">
        <input
          id={id}
          type="checkbox"
          {...register(name)}
          className={`${styles.hiddenCheckbox} checkbox-gradietnt`}
        />
        <label htmlFor={id} className={`${styles.checkboxLabel}`}></label>
      </div>
      <span className={`${textClassName} text-sm`}>{description}</span>
    </div>
  );
};
