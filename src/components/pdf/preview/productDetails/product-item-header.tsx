export const ProcutItemHeader = () => {
  return (
    <div className="bg-[#40506A] py-[8px] rounded-[4px] mb-3">
      <div className="grid grid-cols-3 items-center ">
        <span className="col-span-2 pl-[12px] text-white text-base font-medium ">
          Service / Product
        </span>
        <div className="col-span-1 flex justify-between">
          <span className="text-base font-medium text-white">Price</span>
          <span className="text-base font-medium text-white">Unit</span>
          <span className="text-base font-medium text-white">Count</span>
          <span className="text-base font-medium text-white">Total</span>
        </div>
      </div>
    </div>
  );
};
