import { Footer } from "./footer/footer";

import { MyComponentProp } from "@/types";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
import { isJSON } from "@/utils/functions";
import { getCookie } from "cookies-next";
import SideBar from "@/base-components/SideBar";
import Header from "@/base-components/Header";

export const Layout = ({ children }: MyComponentProp) => {
  // const { user } = useAppSelector(state => state.auth)
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   console.log("login");
    
    // if(!user) useGlobalUser(user, dispatch)
  // }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F3F3F3]">
        <Header />
        <div className="flex mt-[90px]">
          <SideBar />
          <div className="ml-[272px] w-full   mr-5">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};
