import { Header } from "./header/header";
import { Footer } from "./footer/footer";

import { MyComponentProp } from "@/types";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
import { isJSON } from "@/utils/functions";
import { getCookie } from "cookies-next";

export const Layout = ({ children }: MyComponentProp) => {
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    useGlobalUser(user, dispatch)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className="mx-5">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};
