import { HamburgerIcon } from "@/assets/svgs/components/hamburger-icon";
import { combineClasses } from "@/utils/utility";
import buroHeading from "@/assets/pngs/bure-mobile-heading.png";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import userIcon from "@/assets/svgs/Group 48095860.svg";
export interface MobileHeaderProps {
  containerClassName?: string;
  handleDrawer: () => void;
}

export const MobileHeader = ({ handleDrawer }: MobileHeaderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const defaultClasses = combineClasses(
    "fixed w-full top-0 shadow-header z-50 px-6 pb-5 pt-[56px] flex items-center justify-between"
  );

  return (
    <div
      className={defaultClasses}
      style={{
        background:
          "var(--G1, linear-gradient(270deg, #4A13E7 -1.29%, #7B18FF 98.61%))",
      }}
    >
      <div className="flex items-center gap-x-[14px]">
        <HamburgerIcon
          onClick={() => {}}
          strokeColor="#fff"
          containerClassName="xMini:block mlg:hidden"
        />

        <Image src={buroHeading} alt="buero heading" width={75} height={18} />
      </div>

      <Image
        src={user?.employee?.picture || userIcon}
        alt="User Icon"
        className="mr-3 rounded-full"
        width={44}
        height={44}
      />
    </div>
  );
};
