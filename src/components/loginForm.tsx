import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  useTheme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFormik } from 'formik'
import { loginValidator } from '@Validation/users'
import { fetchError, fetchPayload } from '@Redux/notification'
import { IHttpCorsError, IResponsePayload } from '@Validation/app'
import RequestHttp from '@Middleware/request'
import { USER_INFORMATION } from '@Constants/routes'
import { throwHttpError } from '@Middleware/errors'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 400,
    margin: (theme) => theme.spacing(0, 'auto'),
  },
  loginBtn: {
    marginTop: (theme) => theme.spacing(2),
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    background: '#212121',
    color: '#fff',
  },
  card: {
    marginTop: (theme) => theme.spacing(10),
  },
})

const LoginForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useTheme()
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
        const { payload } = await RequestHttp.post<IResponsePayload>(`/login`, {
          ...values,
        })
        await router.push(USER_INFORMATION)
        dispatch(fetchPayload(payload))
      } catch (e) {
        throwHttpError({ err: e as IHttpCorsError, locale: router.locale, fetchError })
        console.log(e)
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
