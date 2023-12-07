import React from 'react'
import { detailScreenCardsLayout } from "@/types";

const PdfCardLayout = ({ children }: detailScreenCardsLayout) => {
  return (
     <div className="rounded-md bg-white py-[20px] px-[20px] w-full h-fit">
      {children}
    </div>
  )
}

export default PdfCardLayout

