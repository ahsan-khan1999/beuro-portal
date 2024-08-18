import { MyComponentProp } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGlobalUser } from "@/utils/hooks";
import SideBar from "@/base-components/SideBar";
import Header from "@/base-components/Header";
import { useRouter } from "next/router";
import { updateCurrentLanguage } from "@/api/slices/globalSlice/global";
import { MobileHeader } from "@/base-components/mobile-header";
import { MobileSidebar } from "@/base-components/ui/mobile-sidebar";

export const Layout = ({ children }: MyComponentProp) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isDrawer, setIsDrawer] = useState(false);
  const [isBelowXMini, setIsBelowXMini] = useState(false);
  const locale = useRouter().locale;
  const router = useRouter();

  useEffect(() => {
    if (!user) useGlobalUser(user, dispatch);
  }, []);

  useEffect(() => {
    dispatch(updateCurrentLanguage(locale));
  }, [locale]);

  useEffect(() => {
    const handleResize = () => {
      setIsBelowXMini(window.innerWidth < 730);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width:1100px)");

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
        } ${isBelowXMini ? "ml-[375px]" : "ml-0"}`}
        onClick={handleClose}
      >
        {isBelowXMini ? (
          <MobileSidebar handleDrawer={handleClose} />
        ) : (
          <SideBar isDrawer={true} handleDrawer={handleClose} />
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#F3F3F3]">
        <div className={`${isAgentRoute ? "hidden mlg:block" : "block"}`}>
          <SideBar isDrawer={false} handleDrawer={handleDrawer} />
        </div>
        <Drawer />

        <div className={`${isAgentRoute ? "hidden xMini:block" : "block"}`}>
          <Header handleDrawer={handleDrawer} />
        </div>

        <div className="block xMini:hidden">
          <MobileHeader handleDrawer={handleDrawer} />
        </div>

        <div
          className={`${
            isAgentRoute ? "xs:ml-5 mlg:ml-[272px]" : "ml-[272px]"
          } mt-[150px] xMini:mt-[90px] mr-5`}
        >
          {children}
        </div>
      </main>
    </>
  );
};
