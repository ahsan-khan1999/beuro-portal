import { DropDownItem } from "@/types";
import { SupportRequestAdmin } from "@/types/admin/support-request";
import { supportRequestData } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useSupportDetail(stage: boolean) {
  const router = useRouter();
  const [supportDetail, setSupportDetail] = useState<SupportRequestAdmin>(
    supportRequestData[0]
  );

  const { t: translate } = useTranslation();

  const items: DropDownItem[] = [
    {
      item: translate(
        "admin.customers_details.card_content.customer_status.active"
      ),
    },
    {
      item: translate(
        "admin.customers_details.card_content.customer_status.block"
      ),
    },
  ];
  const id = router.query.supportRequest;

  useEffect(() => {
    if (typeof Number(id) == "number") {
      let supportRequest = supportRequestData.filter(
        (item) => item.id == Number(id)
      )[0];

      setSupportDetail(supportRequest);
    }
  }, [id]);

  const handlePreviousClick = () => {
    router.push("/admin/support-request");
  };

  return {
    supportDetail,
    status: items,
    handlePreviousClick,
  };
}
