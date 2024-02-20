import { detailScreenCardsLayout } from "@/types";
import { useTranslation } from "next-i18next";
import React, { useRef } from "react";

const TableLayout = ({ children }: detailScreenCardsLayout) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDivScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += e.deltaY;
    }
  };

  const { t: translate } = useTranslation();
  return (
    <div className="overflow-x-hidden">
      <p className="text-[16px] mlg:hidden block mb-2 mt-3">
        <span className="text-red-600 font-bold">
          {translate("common.note")}:{" "}
        </span>
        {translate("common.drag_table")}
      </p>

      <div
        className="min-w-full overflow-hidden"
        style={{ paddingBottom: "calc(100vh - 920px)" }}
        onWheel={handleDivScroll}
        ref={containerRef}
      >
        <div className="xs:w-[1120px] md:w-auto rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default TableLayout;
