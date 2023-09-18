import { LoaderType } from '@/types'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function Loader({ height, width, radius, color }: LoaderType) {
    return (
        <ThreeDots
            height={height}
            width={width}
            radius={radius}
            color={color}
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
        />
    )
}
