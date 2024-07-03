import { combineClasses } from "@/utils/utility";

export interface InvoiceCardProps {
  heading: string;
  value: number;
  className?: string;
}

export const InvoiceCard = ({
  heading,
  value,
  className,
}: InvoiceCardProps) => {
  const containerClassName = combineClasses(
    "pl-[15px] pr-[10px] pt-3 pb-[17px] rounded-md bg-primary flex flex-col gap-y-1",
    className
  );

  return (
    <div className={containerClassName}>
      <span className="text-sm font-medium text-white">{heading}:</span>
      <p className="text-xl font-semibold text-white">CHF {value}</p>
    </div>
  );
};
