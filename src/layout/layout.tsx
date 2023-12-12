import { MyComponentProp } from "@/types";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
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

      <main className="bg-[#F3F3F3]">
        <Header />
        <div className="grid grid-cols-[247px_minmax(0px,_1fr)] gap-x-[30px] mr-5 mt-[90px]">
          <div className="h-screen">
            <SideBar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </main>
    </>
  );
};
