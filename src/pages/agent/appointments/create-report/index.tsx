import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { CreateReport } from "@/components/agent/appointments/createReport";
import Header from "@/base-components/Header";
import Head from "next/head";

export const index = () => {
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <main className="bg-[#F3F3F3]">
      <Header />

      <div className="flex items-center justify-center mt-[205px]">
        <CreateReport />
      </div>
    </main>
  </>;
};

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
