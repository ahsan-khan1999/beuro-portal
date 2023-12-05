import { ToggleButtonFormProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const ToggleButton = ({
  id,
  name,
  register,
  className,
  checked,
  onClick
}: ToggleButtonFormProps) => {
  const disabledClass = false ? 'bg-borderColor' : 'bg-lightGray';
  const combineClass = combineClasses(`relative h-[13px] w-[26px] px-[2px] flex-shrink-0 appearance-none rounded-full ${disabledClass}
    after:absolute after:z-[2] after:h-[8px] after:w-[10px] after:rounded-full after:border-none after:bg-white after:mt-[2px]
    after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-['']
    checked:bg-secondary checked:after:absolute checked:after:z-[2] checked:after:ml-[10px] checked:after:border-none  
    checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)]
    checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none
    checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]`, className)
  return (
    <input
      {...register(name)}
      className={combineClass}
      type="checkbox"
      role="switch"
      id={id}
      defaultChecked={checked}
      onChangeCapture={() => onClick && onClick()}
    />
  );
};
