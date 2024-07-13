import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEmptyStates } from "@/utils/hooks";
import PlanInfo from "./PlanInfo";
import { chooseCompanyPlan } from "@/api/slices/company/companySlice";
import { isJSON } from "@/utils/functions";
import { getUser } from "@/utils/auth.util";
import { useRouter } from "next/router";

const Cards = ({ planTime }: { planTime: number }) => {
  const { plan, loading } = useAppSelector((state) => state.company);
  const user = isJSON(getUser());
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChoosePlan = async (planID: string) => {
    const response = await dispatch(
      chooseCompanyPlan({ data: { plan: planID, id: user?.id } })
    );
    if (response?.payload) router.push("/dashboard");
  };

  const CurrentComponent = useEmptyStates(
    <PlanInfo
      plan={plan}
      handleChoosePlan={handleChoosePlan}
      loading={loading}
      planTime={planTime}
    />,
    plan?.length > 0,
    loading
  );

  return CurrentComponent;
};

export default Cards;
