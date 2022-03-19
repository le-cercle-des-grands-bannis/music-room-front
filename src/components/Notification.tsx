import { INTERNAL_ERROR_EN } from '@Constants/errors'
import CancelIcon from '@mui/icons-material/Cancel'
import withStyles from '@mui/styles/withStyles'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'
import Snackbar, { SnackbarOrigin, SnackbarCloseReason } from '@mui/material/Snackbar'
import { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { fetchError, fetchPayload, StoreType, openCloseNotif } from '@Redux/notification'

interface StateSnackBar extends SnackbarOrigin {
  open: boolean
}

interface Base64Cookie {
  message: string
}

const Alert = (props: AlertProps): JSX.Element => (
  <MuiAlert elevation={6} variant="filled" {...props} />
)

const AlertWithAction = withStyles({
  action: {
    paddingLeft: 7,
    paddingRight: 7,
  },
})(Alert)

const CancelIconOnAction = withStyles({
  root: {
    fontSize: 20,
    cursor: 'pointer',
  },
})(CancelIcon)

const AlertMessage = ({
  message,
  severity,
  handleClose,
}: {
  message: string | null
  severity: AlertColor
  handleClose: () => void
}): JSX.Element | null => {
  if (message) {
    return (
      <AlertWithAction severity={severity} action={<CancelIconOnAction onClick={handleClose} />}>
        {message}
      </AlertWithAction>
    )
  }
  return null
}

const getMessageByLang = (payload: string | null, error: string | null): string | null =>
  payload || error

/**
 * ## Notification component
 * Display a notification related to store <br>
 * success if having a payload in store <br>
 * error if having an error in store
 * @returns {JSX.Element}
 * @constructor
 */
export const Notification = (): JSX.Element => {
  const { payload, error, openNotif } = useSelector((state: StoreType) => state)
  const dispatch = useDispatch()
  const [state] = useState<StateSnackBar>({
    horizontal: 'center',
    open: openNotif,
    vertical: 'top',
  })
  const { vertical, horizontal } = state
  const [cookies] = useCookies(['success_message', 'error_message'])

  const handleClose = useCallback((event: any, reason: SnackbarCloseReason) => {
    if ('timeout' === reason) {
      dispatch(openCloseNotif(false))
    }
    if (
      event &&
      'clickaway' === reason &&
      0 < event.screenX &&
      0 < event.screenY &&
      0 < event.clientX &&
      0 < event.clientY
    ) {
      dispatch(openCloseNotif(false))
    }
    dispatch(fetchPayload(null))
    dispatch(fetchError(null))
  }, [])

  const handleCloseWithButton = useCallback(() => {
    dispatch(openCloseNotif(false))
  }, [])

  useEffect(() => {
    console.log(error)
    if (error || payload) {
      dispatch(openCloseNotif(true))
    }
  }, [payload, error])

  useEffect(() => {
    try {
      if (cookies.success_message) {
        const payload: Base64Cookie = JSON.parse(
          Buffer.from(cookies.success_message, 'base64').toString('ascii')
        )
        dispatch(fetchPayload(payload.message))
      }
      if (cookies.error_message) {
        const payload: Base64Cookie = JSON.parse(
          Buffer.from(cookies.error_message, 'base64').toString('ascii')
        )
        dispatch(fetchError(payload.message))
      }
    } catch {}
  }, [cookies])

  console.log({ error })

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={openNotif}
      autoHideDuration={5000}
      onClose={handleClose}
      disableWindowBlurListener
    >
      <div>
        {payload && !error && (
          <AlertMessage
            message={getMessageByLang(payload, error)}
            severity={'success'}
            handleClose={handleCloseWithButton}
          />
        )}
        {error && !payload && (
          <AlertMessage
            message={getMessageByLang(payload, error)}
            severity={'error'}
            handleClose={handleCloseWithButton}
          />
        )}
      </div>
    </Snackbar>
  )
}
