import { DatePickerProps } from "@/types";
import { formatDateString } from "@/utils/functions";
import { combineClasses } from "@/utils/utility";

export const DatePicker = ({
  id,
  name,
  register,
  value,
  className,
  remove,
  onRemove
}: DatePickerProps) => {

  const defaultClasses =
    "flex  gap-x-4 border bg-no-repeat bg-[length:24px_24px] border-lightGray rounded-lg h-12 pl-12 py-3 focus:border-primary outline-none";
  const classes = combineClasses(defaultClasses, className);
  return (
    <>
      <div>
        {
          remove &&
          <div className="cursor-pointer  absolute right-0 bg-red px-3 py-1 mt-1 text-white rounded-t-md" onClick={onRemove}>
            {remove}
          </div>
        }

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
          className={`${classes} relative`}
        />
      </div>

    </>
  );
};
