import {useEffect, useCallback} from "react";
import {useDispatch} from "react-redux";
import {fetchError as fetchErrorAction, fetchPayload as fetchPayloadAction} from "@Redux/notification";
import {IHttpCorsError, IResponsePayload} from "@Validation/app";
import RequestHttp from "@Middleware/request";
import { LOGIN_PAGE } from "@Constants/routes";
import {throwHttpError} from "@Middleware/errors";
import {useRouter} from "next/router";

const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const fetchError = useCallback((error: string | null) => dispatch(fetchErrorAction(error)), [dispatch]);
    const fetchPayload = useCallback((payload: string | null) => dispatch(fetchPayloadAction(payload)), [dispatch]);

    useEffect(() => {
        RequestHttp
            .delete<IResponsePayload>('logout', {})
            .then(async (result:IResponsePayload) => {
                await router.push(LOGIN_PAGE)
                fetchPayload(result.payload)
            })
            .catch((err: IHttpCorsError) => throwHttpError({err, locale: router.locale, fetchError}))
    }, [])

    return (
        <></>
    );
}

export default Logout