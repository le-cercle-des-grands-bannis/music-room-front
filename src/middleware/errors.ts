import {fetchError as fetchErrorAction} from "@Redux/notification";
import {INTERNAL_ERROR_EN, INTERNAL_ERROR_FR} from "@Constants/errors";
import {IHttpCorsError} from "@Validation/app";

interface IThrowHttpError {err: IHttpCorsError; locale: string | undefined, fetchError: typeof fetchErrorAction}

export const throwHttpError = ({err, locale, fetchError}: IThrowHttpError) => {
    const messages: string | undefined = err.message;
    try {
        const {errors}: {errors: string[]} = JSON.parse(messages);
        if ("undefined" !== typeof errors && errors.length) {
            errors.map(error => {
                fetchErrorAction(error);
            })
            return;
        }
    } catch {
        if (locale === "fr") {
            fetchErrorAction(INTERNAL_ERROR_FR)
            return;
        }
        fetchErrorAction(INTERNAL_ERROR_EN)
    }
}