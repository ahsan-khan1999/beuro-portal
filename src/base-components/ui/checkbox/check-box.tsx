import { combineClasses } from "@/utils/utility";
import classes from "./checkbox.module.css";
import { CheckBoxInputProps } from "@/types";

export const CheckBox = ({ onChange, isChecked, className, id }: CheckBoxInputProps) => {
    const checkBoxClasses = combineClasses(classes.checkboxLabel,className);
  return (
    <>
      <input
        id={id}
        onChange={(e) => onChange(e.target.checked)}
        checked={isChecked}
        type="checkbox"
        className={classes.hiddenCheckbox}
      />
      <label htmlFor={id} className={checkBoxClasses}></label>
    </>
  );
};
