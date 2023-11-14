import React, { useEffect } from 'react'
import Image from "next/image";
import mailPopIcon from "@/assets/svgs/email-popup-image.svg";
import { Button } from "@/base-components/ui/button/button";
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useRouter } from 'next/router';
import { verifyOtp } from '@/api/slices/authSlice/auth';

const VerifyEmail = ({ data }: { data: { heading: string, description: String } }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector(state => state.auth)
    const { otp } = router.query
    useEffect(() => {
        if (otp) {
            dispatch(verifyOtp(router))
        }
    }, [dispatch, otp])
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="relative shadow-emailPopup rounded-2xl bg-white pt-11 pb-[60px] px-[90px] max-w-[625px]">
                <Image
                    src={mailPopIcon}
                    alt="Email Popup Image"
                    className="mb-9 mx-auto"
                />
                <h1 className="font-medium text-2xl text-[#000000] mb-3 text-center">
                    {data.heading}
                </h1>
                <p className="text-sm text-dark mb-8 text-center">
                    {data.description}
                </p>
               
            </div>
        </div>
    );
}

export default VerifyEmail