import { HttpCors } from '@benjaminnoufel/http-cors'
import { normalizePath } from '@benjaminnoufel/tools'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'fr'

class RequestHttp {
  public static get = <T>(url: string, options?: RequestInit, locale?: string): Promise<T> => {
    return HttpCors.get(`${API_URL}/${normalizePath(`/${url}`)}`, {
      ...options,
      headers: {
        ...options?.headers,
        'Accept-language': locale || DEFAULT_LOCALE,
      },
    })
  }

  public static post = <T>(
    url: string,
    body: Record<string, any>,
    options?: RequestInit,
    locale?: string
  ): Promise<T> => {
    return HttpCors.post(`${API_URL}/${normalizePath(`/${url}`)}`, body, {
      ...options,
      headers: {
        ...options?.headers,
        'Accept-language': locale || DEFAULT_LOCALE,
      },
    })
  }

  public static put = <T>(
    url: string,
    body: Record<string, any>,
    options?: RequestInit,
    locale?: string
  ): Promise<T> => {
    return HttpCors.put(`${API_URL}/${normalizePath(`/${url}`)}`, body, {
      ...options,
      headers: {
        ...options?.headers,
        'Accept-language': locale || DEFAULT_LOCALE,
      },
    })
  }

  public static patch = async <T>(
    url: string,
    body: Record<string, any>,
    options?: RequestInit,
    locale?: string
  ): Promise<T> => {
    return HttpCors.patch(`${API_URL}/${normalizePath(`/${url}`)}`, body, {
      ...options,
      headers: {
        ...options?.headers,
        'Accept-language': locale || DEFAULT_LOCALE,
      },
    })
  }

  public static delete = <T>(url: string, options?: RequestInit, locale?: string): Promise<T> => {
    return HttpCors.delete(`${API_URL}/${normalizePath(`/${url}`)}`, {
      ...options,
      headers: {
        ...options?.headers,
        'Accept-language': locale || DEFAULT_LOCALE,
      },
    })
  }
}

export default RequestHttp
