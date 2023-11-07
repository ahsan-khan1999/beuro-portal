import { CustomersAdmin } from "@/types/admin/customer";
import { Customers } from "@/types/customer";
import { customers, customersAdmin } from "@/utils/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useCustomerDetail(stage: boolean) {
  const router = useRouter();
  const [customerDetail, setCustomerDetail] = useState<CustomersAdmin>(customersAdmin[0]);

  const id = router.query.customer;

  useEffect(() => {
    if (typeof Number(id) == "number") {
      let customer = customersAdmin.filter((item) => item.id == Number(id))[0];

      setCustomerDetail(customer);
    }
  }, [id]);

  const handlePreviousClick = () => {
    router.push("/admin/customers");
  };

  return {
    customerDetail,
    handlePreviousClick,
  };
}
