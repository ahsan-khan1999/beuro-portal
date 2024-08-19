interface MobileDetailItemProps {
  label: string;
  value?: string;
}

export const MobileDetailItem: React.FC<MobileDetailItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between mb-[11px]">
      <span className="text-[#656565] text-xs font-medium">{label}:</span>
      <span className="text-sm text-[#4A4543] font-medium">{value}</span>
    </div>
  );
};
