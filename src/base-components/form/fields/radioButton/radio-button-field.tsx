import { RadioButtonProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const RadioButtonField = ({
  id,
  value,
  name,
  register,
  className,
  label,
  checked
}: RadioButtonProps) => {
  const defaultClasses = `border-2 border-lightGray rounded-lg w-5 h-5 px-4 py-3 text-primary bg-secondary  cursor-pointer`;
  const classes = combineClasses(defaultClasses, className);
  
  return (
    <div className="flex gap-x-2 items-center  bg-white">
      <input
        id={id}
        type='radio'
        defaultValue={value}
        checked={checked}
        {...register(name)}
        className={`${classes}`}
      />
      <span>{label}</span>
    </div>

  );
};