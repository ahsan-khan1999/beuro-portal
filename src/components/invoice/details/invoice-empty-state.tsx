import { InvoiceEmptyStateType } from '@/types/invoice'
import Image from 'next/image'
import React from 'react'


export default function InvoiceEmptyState({ emptyName, imageAlt, imageUrl, emptyDescription }: InvoiceEmptyStateType) {
    return (
        <div className='w-full h-[248px] mt-6  flex flex-col gap-y-4 justify-center items-center rounded-lg '>
            <Image src={imageUrl} alt={imageAlt} width={165} height={165} />
            <h1 className='text-dark font-semibold text-xl'>{emptyName}</h1>
            <p className=' text-gray text-base w-72 text-center'>{emptyDescription}</p>

        </div>
    )
}
