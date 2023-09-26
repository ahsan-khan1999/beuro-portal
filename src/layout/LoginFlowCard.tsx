import { detailScreenCardsLayout } from "@/types";

export const LoginFlowCard = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mx-auto max-w-[1030px]    shadow-loginCard ">
        <main className="p-[14px] flex min-h-[749px] ">{children}</main>
      </div>
    </div>
  );
};
