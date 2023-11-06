import { TRowServices } from "@/types/service";
import { servicesData } from "@/utils/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useServiceDetail = () => {
  const router = useRouter();
  // @ts-expect-error
  const [serviceDetail, setServiceDetail] = useState<TRowServices>({});
  const id = router.query.service;
  console.log(id, "ids");

  useEffect(() => {
    if (typeof Number(id) == "number")
      console.log(
        servicesData.filter((item) => item.id === id),
        "1234"
      );

    setServiceDetail(servicesData.filter((item) => item.id === id)[0]);
  }, [id]);
  return {
    serviceDetail,
  };
};
export default useServiceDetail;
