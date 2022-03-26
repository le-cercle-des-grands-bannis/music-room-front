import { useDispatch } from 'react-redux'
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
import { registerValidator } from '@Validation/users'
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

const RegisterForm = () => {
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
  const classes = useStyles(theme)
  const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
    initialValues: {
      username: '',
      email: '',
      email_confirmation: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: registerValidator(),
    async onSubmit(values) {
      try {
        const { payload } = await RequestHttp.post<ResponsePayloadType>(`/register`, {
          ...values,
        })
        await router.push(USER_INFORMATION)
        fetchPayload(payload)
      } catch (e) {
        throwHttpError({ err: e as HttpCorsErrorType, locale: router.locale, fetchError })
        console.log(e)
      }
    },
  })

  return (
    <form className={classes.container} noValidate onSubmit={handleSubmit} autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Register App" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              name="username"
              type="text"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleChange}
              value={values.username}
            />
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleChange}
              value={values.email}
            />
            <TextField
              fullWidth
              name="email_confirmation"
              type="email"
              label="Email confirmation"
              placeholder="Email confirmation"
              margin="normal"
              onChange={handleChange}
              value={values.email_confirmation}
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
            <TextField
              fullWidth
              name="password_confirmation"
              type="password"
              label="Password confirmation"
              placeholder="Password confirmation"
              margin="normal"
              onChange={handleChange}
              value={values.password_confirmation}
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
            Register
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default RegisterForm
