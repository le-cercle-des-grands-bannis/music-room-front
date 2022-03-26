import { fetchError as fetchErrorAction } from '@Redux/notification'
import { INTERNAL_ERROR_EN, INTERNAL_ERROR_FR } from '@Constants/errors'
import type { HttpCorsErrorType } from '@Validation/app'

type ThrowHttpErrorType = {
  err: HttpCorsErrorType
  locale: string | undefined
  fetchError: any
}

export const throwHttpError = ({ err, locale, fetchError }: ThrowHttpErrorType) => {
  const messages: string | undefined = err.message
  try {
    const { errors }: { errors: string[] } = JSON.parse(messages)
    if ('undefined' !== typeof errors && errors.length) {
      errors.map((error) => {
        fetchError(error)
      })
      return
    }
  } catch {
    if (locale === 'fr') {
      fetchError(INTERNAL_ERROR_FR)
      return
    }
    fetchError(INTERNAL_ERROR_EN)
  }
}
