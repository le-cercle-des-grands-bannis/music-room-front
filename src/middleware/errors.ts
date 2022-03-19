import { fetchError as fetchErrorAction } from '@Redux/notification'
import { INTERNAL_ERROR_EN, INTERNAL_ERROR_FR } from '@Constants/errors'
import type { HttpCorsErrorType } from '@Validation/app'

type ThrowHttpErrorType = {
  err: HttpCorsErrorType
  locale: string | undefined
  fetchError: typeof fetchErrorAction
}

export const throwHttpError = ({ err, locale, fetchError }: ThrowHttpErrorType) => {
  const messages: string | undefined = err.message
  try {
    const { errors }: { errors: string[] } = JSON.parse(messages)
    if ('undefined' !== typeof errors && errors.length) {
      errors.map((error) => {
        fetchErrorAction(error)
      })
      return
    }
  } catch {
    if (locale === 'fr') {
      fetchErrorAction(INTERNAL_ERROR_FR)
      return
    }
    fetchErrorAction(INTERNAL_ERROR_EN)
  }
}
