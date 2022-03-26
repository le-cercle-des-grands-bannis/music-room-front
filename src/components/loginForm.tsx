import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Theme,
  useTheme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFormik } from 'formik'
import { loginValidator } from '@Validation/users'
import {
  fetchError as fetchErrorAction,
  fetchPayload as fetchPayloadAction,
} from '@Redux/notification'
import { HttpCorsErrorType, ResponsePayloadType } from '@Validation/app'
import RequestHttp from '@Middleware/request'
import { USER_INFORMATION } from '@Constants/routes'
import { throwHttpError } from '@Middleware/errors'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { RootState } from '@Redux/store'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 400,
    margin: (theme: Theme) => theme.spacing(0, 'auto'),
  },
  loginBtn: {
    marginTop: (theme: Theme) => theme.spacing(2),
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    background: '#212121',
    color: '#fff',
  },
  card: {
    marginTop: (theme: Theme) => theme.spacing(10),
  },
})

const LoginForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const fetchError = useCallback(
    (error: string | null) => dispatch(fetchErrorAction(error)),
    [dispatch]
  )
  const fetchPayload = useCallback(
    (payload: string | null) => dispatch(fetchPayloadAction(payload)),
    [dispatch]
  )
  const theme = useTheme()
  const { error } = useSelector((state: RootState) => state.notification)
  const classes = useStyles(theme)
  const { handleChange, handleSubmit, values, isSubmitting, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginValidator(),
    async onSubmit(values) {
      try {
        const { payload } = await RequestHttp.post<ResponsePayloadType>(`/login`, {
          ...values,
        })
        await router.push(USER_INFORMATION)
        fetchPayload(payload)
      } catch (e) {
        console.log(error)
        throwHttpError({ err: e as HttpCorsErrorType, locale: router.locale, fetchError })
        console.log(error)
      }
    },
  })

  return (
    <form className={classes.container} noValidate onSubmit={handleSubmit} autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleChange}
              value={values.email}
              error={Boolean(errors.email && values.email)}
            />
            <TextField
              fullWidth
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              onChange={handleChange}
              value={values.password}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default LoginForm
