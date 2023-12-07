import React from 'react'
import ContactSupport from '@/components/contactSupport'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const Index = () => {
  return (
    <div>
      <ContactSupport />
    </div>
  )
}

export default Index
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
