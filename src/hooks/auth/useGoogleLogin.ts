import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signUpGoogle } from "@/api/slices/authSlice/auth";
import { useAppDispatch, useAppSelector } from "../useRedux";

export default function useGoogleLogin() {
    const { t: translate } = useTranslation()
    const { error } = useAppSelector(state => state.auth)

    const router = useRouter()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (router.query?.code) {
            dispatch(signUpGoogle({ router, oauthCode: router.query?.code, translate }))
        }
    }, [router.query]);
    return {
        error
    }
}
