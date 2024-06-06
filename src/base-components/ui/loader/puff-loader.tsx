import { PuffLoader } from "react-spinners";

export const CustomPuffLoader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-transparent h-[300px] mt-10">
      <PuffLoader color="#4A13E7" size={120} />
    </div>
  );
};
