import { ContentTableRowTypes } from "@/types/content";
import { contentData } from "@/utils/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useContentDetail = () => {
  const router = useRouter();
  // @ts-expect-error
  const [contentDetail, setContentDetail] = useState<ContentTableRowTypes>({});
  const id = router.query.content;

  useEffect(() => {
    if (typeof Number(id) == "number")

    setContentDetail(contentData.filter((item) => item.id === id)[0]);
  }, [id]);
  return {
    contentDetail,
  };
};
export default useContentDetail;
