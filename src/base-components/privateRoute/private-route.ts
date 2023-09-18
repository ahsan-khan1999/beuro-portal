import { getCookie } from 'cookies-next';
import { isJSON } from '@/utils/functions';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateQuery } from '@/utils/update-query';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useGlobalUser } from '@/utils/hooks';

const WithPrivateRoute = ({ children }: ReactNode | any) => {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const cookieUser = isJSON(getCookie("kaufesuser"))
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            useGlobalUser(user, dispatch);
        }
        if (!cookieUser) {
            alert("Unauthorize access")
            router.pathname = '/login';
            updateQuery(router, "en")
        }
    }, []);

    return children;

};

export default WithPrivateRoute;