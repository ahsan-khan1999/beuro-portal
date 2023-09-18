import { connectGoogle } from "@/api/slices/authSlice/auth";

export default async function useGoogleConnect({ router, dispatch, translate }: any): Promise<any> {
    if (!router.query?.code) return new Promise(() => { });
    return await dispatch(connectGoogle({ router, oauthCode: router.query?.code, translate }))
}
