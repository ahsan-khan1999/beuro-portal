import { InvoiceEmptyStateType } from '@/types/invoice'
import Image from 'next/image'
import React from 'react'

import emptyState from "@/assets/svgs/empty-state.svg";



export default function NoDataEmptyState() {
    return (
        <div className='w-full mt-6  flex flex-col gap-y-4 justify-center items-center rounded-lg '>
            <Image src={emptyState} alt={""} width={165} height={165} />
            <h1 className='text-dark font-semibold text-xl'>No Data Found</h1>
            <p className=' text-gray text-base w-72 text-center'>Whoops ... this information is not avilable for a moment</p>
        </div>
    )
}
