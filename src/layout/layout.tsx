import { MyComponentProp } from "@/types";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
import SideBar from "@/base-components/SideBar";
import Header from "@/base-components/Header";
import { useRouter } from "next/router";
import { updateCurrentLanguage } from "@/api/slices/globalSlice/global";

export const Layout = ({ children }: MyComponentProp) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const locale = useRouter().locale;
  useEffect(() => {
    if (!user) useGlobalUser(user, dispatch);
  }, []);

  useEffect(() => {
    dispatch(updateCurrentLanguage(locale));
  }, [locale]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F3F3F3]">
        <Header />
        <SideBar />
        <div className="mr-5">
          <div className="ml-[272px] mt-[90px]">{children}</div>
        </div>
      </main>
    </>
  );
};
