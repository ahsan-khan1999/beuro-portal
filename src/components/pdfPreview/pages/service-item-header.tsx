export const ServiceItemHeader = () => {
  return (
    <div className="bg-[#40506A] py-[8px] rounded-[4px] mb-3">
      <div className="flex justify-between items-center ">
        <span className="pl-[12px] text-white text-base font-medium ">
          Service / Product
        </span>
        <div className="flex gap-[82px] ">
          <span className="text-base font-medium text-white">Price</span>
          <span className="text-base font-medium text-white">Unit</span>
          <span className="text-base font-medium text-white">Count</span>
          <span className="text-base font-medium text-white pr-[46px]">
            Total
          </span>
        </div>
      </div>
    </div>
  );
};
