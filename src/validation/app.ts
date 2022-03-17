export interface IResponsePayload<T = string> {
    payload: T;
}

export interface IHttpCorsError extends Error {}