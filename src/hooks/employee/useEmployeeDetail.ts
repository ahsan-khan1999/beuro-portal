import { TRowEmployees } from "@/types/employee";
import { employeesData } from "@/utils/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useEmployeeDetail() {
  const router = useRouter();
  // @ts-expect-error
  const [employeeDetail, setEmployeeDetail] = useState<TRowEmployees>({});
  const id = router.query.employee;
  console.log(id, "ids");

  useEffect(() => {
    if (typeof Number(id) == "number")
      console.log(
        employeesData.filter((item) => item.id === id),
        "1234"
      );

    setEmployeeDetail(employeesData.filter((item) => item.id === id)[0]);
  }, [id]);
  return {
    employeeDetail,
  };
}
