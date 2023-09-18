import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signUpFacebook } from "@/api/slices/authSlice/auth";
import { useAppDispatch, useAppSelector } from "../useRedux";

export default function useFacebookLogin() {
    const router = useRouter()
    const { t: translate } = useTranslation()
    const { error } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (router.query?.code) {
            dispatch(signUpFacebook({ router, oauthCode: router.query?.code, translate }))
        }
    }, [router.query]);
    return {
        error
    }
}
