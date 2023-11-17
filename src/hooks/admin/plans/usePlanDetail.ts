// import { SupportRequestAdmin } from "@/types/admin/support-request";
// import { Customers } from "@/types/customer";
// import { customers, customersAdmin, supportRequestData } from "@/utils/static";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function usePlanDetail(stage: boolean) {
//   const router = useRouter();
//   const [supportDetail, setSupportDetail] = useState<SupportRequestAdmin>(
//     supportRequestData[0]
//   );

//   const id = router.query.supportRequest;

//   useEffect(() => {
//     if (typeof Number(id) == "number") {
//       let supportRequest = supportRequestData.filter(
//         (item) => item.id == Number(id)
//       )[0];
//       setSupportDetail(supportRequest);
//     }
//   }, [id]);

//   const handlePreviousClick = () => {
//     router.push("/admin/support-request");
//   };

//   return {
//     supportDetail,
//     handlePreviousClick,
//   };
// }

import { SupportRequestAdmin } from "@/types/admin/support-request";
import { plansAdminData, supportRequestData } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generatePlansValidation } from "@/validation/admin/plansSchema";
import { planDetailsFormField } from "@/components/admin/plans/plan-fields";
import { PlansAdmin } from "@/types/admin/plans";

export default function usePlanDetail(stage: boolean) {
  const { t: translate } = useTranslation();
  const { loading } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const [planDetail, setPlanDetail] = useState<PlansAdmin>(plansAdminData[0]);
  const [isUpdate, setIsUpdate] = useState<boolean>(stage);

  const id = router.query.plans;
  const schema = generatePlansValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (typeof Number(id) == "number") {
      let plan = plansAdminData.filter((item) => item.id == Number(id))[0];

      if (plan) {
        reset({
          ...plan,
        });
      }
      setPlanDetail(plan);
    }
  }, [id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const fields = planDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel,
    control
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
  };
  const handlePreviousClick = () => {
    router.push("/admin/support-request");
  };

  return {
    planDetail,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handlePreviousClick,
    handleUpdateCancel,
  };
}
