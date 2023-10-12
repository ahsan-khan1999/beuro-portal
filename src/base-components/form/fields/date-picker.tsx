import { DatePickerProps } from "@/types";
import { formatDateString } from "@/utils/functions";
import { combineClasses } from "@/utils/utility";

export const DatePicker = ({
  id,
  name,
  register,
  value,
  className,
}: DatePickerProps) => {
  
  const defaultClasses =
    "flex flex-row-reverse gap-x-4 border bg-no-repeat bg-[length:24px_24px] border-lightGray rounded-lg h-12 pl-12 py-3 focus:border-primary outline-none";
  const classes = combineClasses(defaultClasses, className);
  return (
    <>
      <input
        type="date"
        // value={formatDateString(value)}
        defaultValue={formatDateString(value)}
        id={id}
        {...register(name)}
        // style={{
        //   backgroundImage: 'url("@/assets/svgs/calender.svg")',
        //   backgroundPosition: "4% 50%",
        // }}
        className={`${classes} relative` }
      />
    </>
  );
};
