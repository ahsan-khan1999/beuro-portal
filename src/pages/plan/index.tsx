import React, { useEffect, useState } from "react";
import Cards from "@/components/pricing/Cards";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readPlan } from "@/api/slices/company/companySlice";

const Pricing = () => {
  const [planTime, setPlanTime] = useState(0);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(readPlan({ params: { filter: {}, page: 1, size: 10 } }))
  }, [])

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mx-auto max-w-[950px]   shadow-loginCard pt-[62px] pb-11 px-[52px] rounded-2xl">
        <div className="flex justify-between">
          <div className="max-w-[470px]">
            <h1 className="text-[#000] text-[26px] font-medium mb-3 tracking-[-0.2px]">
              Let's start with us
            </h1>
            <p className="text-xs text-dark tracking-[0.36px]">
              You can use any of the given package on one month free trail.
              smith amit dolem isplum sumip alpsum Lorem ipsum.
            </p>
          </div>

          <div className="border-[#00000012]  border-[0.3px] bg-white rounded-full max-w-[139px] flex   items-center space-x-1 p-[3px] text-xs w-fit h-fit font-semibold filter-shadow  text-[#1E1E1EAD]">
            <span
              onClick={() => setPlanTime(0)}
              className={`px-[10px] py-[6px] ${planTime === 0 &&
                " pricing-gradient text-white rounded-full"
                }   cursor-pointer`}
            >
              Monthly
            </span>
            <span
              onClick={() => setPlanTime(1)}
              className={`px-[10px] py-[6px] ${planTime === 1 &&
                " pricing-gradient text-white rounded-full"
                }   cursor-pointer`}
            >
              Yearly
            </span>
          </div>
        </div>
        <Cards planTime={planTime}  />
      </div>
    </div>
  );
};

export default Pricing;
