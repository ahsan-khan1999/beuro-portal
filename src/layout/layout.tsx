import { MyComponentProp } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
import SideBar from "@/base-components/SideBar";
import Header from "@/base-components/Header";
import { useRouter } from "next/router";
import { updateCurrentLanguage } from "@/api/slices/globalSlice/global";

export const Layout = ({ children }: MyComponentProp) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isDrawer, setIsDrawer] = useState(false);
  const locale = useRouter().locale;
  const router = useRouter();

  useEffect(() => {
    if (!user) useGlobalUser(user, dispatch);
  }, []);

  useEffect(() => {
    dispatch(updateCurrentLanguage(locale));
  }, [locale]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width:1024px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsDrawer(false);
      }
    };
    if (mediaQuery.matches) {
      setIsDrawer(false);
    }
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleDrawer = () => {
    setIsDrawer((prev) => !prev);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setIsDrawer((prev) => !prev);
  };

  const path = router.asPath;
  const isAgentRoute = path.startsWith("/agent");

  const Drawer = () => {
    return (
      <div
        className={`!fixed top-0 flex justify-center items-center z-[999] bg-[#1E1E1E] w-screen h-screen bg-opacity-40 ${
          isDrawer ? "block" : "hidden"
        }`}
        onClick={handleClose}
      >
        <SideBar isDrawer={true} handleDrawer={(e) => handleClose(e)} />
      </div>
    );
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F3F3F3]">
        <div
          className={`${isAgentRoute ? "xMini:hidden xPro:block" : "block"}`}
        >
          <SideBar isDrawer={false} handleDrawer={handleDrawer} />
        </div>
        <Drawer />
        <Header handleDrawer={handleDrawer} />
        <div
          className={`${
            isAgentRoute ? "xMini:ml-5 xPro:ml-[272px]" : "ml-[272px]"
          } mt-[90px] mr-5`}
        >
          {children}
        </div>
      </main>
    </>
  );
};
