import React from 'react'
import Employs from '@/components/employees'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const index = () => {
  return (
    <div>
      <Employs />
    </div>
  )
}

export default index
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});