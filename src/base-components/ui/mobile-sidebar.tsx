import { logoutUser } from "@/api/slices/authSlice/auth";
import { HamburgerIcon } from "@/assets/svgs/components/hamburger-icon";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/utils/auth.util";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useRouter } from "next/router";
import { LogoutIcon } from "@/assets/svgs/components/logout-icon";
import { LanguageSelector } from "../languageSelector/language-selector";

export interface MobileSidebarProps {
  containerClassName?: string;
  handleDrawer: (e: any) => void;
}

export const MobileSidebar = ({
  containerClassName,
  handleDrawer,
}: MobileSidebarProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const defaulClasses = combineClasses(
    "px-6 pt-10 bg-white flex flex-col",
    containerClassName
  );

  const handleLogout = async () => {
    await dispatch(logoutUser());
    logout();
    router.push("/");
  };

  return (
    <div className={defaulClasses}>
      <div className="flex items-center justify-between">
        <HamburgerIcon onClick={handleDrawer} strokeColor="#272727" />
        {user?.company?.logo && (
          <Image
            src={user?.company?.logo}
            alt="Company Logo"
            className={`w-[100px] h-[40px]`}
            height={40}
            width={100}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-x-3 cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span className="text-[#4B4B4B] text-sm font-medium">
              {translate("common.logout")}
            </span>
          </div>

          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};
