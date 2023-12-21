import { Footer } from "./footer/footer";

import { MyComponentProp } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
import { isJSON } from "@/utils/functions";
import { getCookie } from "cookies-next";
import SideBar from "@/base-components/SideBar";
import Header from "@/base-components/Header";

export const Layout = ({ children }: MyComponentProp) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) useGlobalUser(user, dispatch);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F3F3F3] h-screen">
        <Header />
        <SideBar />
        <div className="mr-5">
          <div className="ml-[272px] mt-[90px]">{children}</div>
        </div>
      </main>
    </>
  );
};
