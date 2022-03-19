import * as Yup from 'yup'

export const loginValidator = () => {
  return Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  })
}

export const registerValidator = () => {
  return Yup.object().shape({
    username: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string(),
    email_confirmation: Yup.string(),
    password: Yup.string(),
    password_confirmation: Yup.string(),
  })
}

export const forgetPasswordValidator = () => {
  return Yup.object().shape({
    email: Yup.string(),
  })
}

export const setNewPasswordValidator = () => {
  return Yup.object().shape({
    password: Yup.string(),
    password_confirmation: Yup.string(),
  })
}

export const updateInformationValidator = () => {
  return Yup.object().shape({
    username: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string(),
  })
}

export const updateUserPasswordValidator = () => {
  return Yup.object().shape({
    oldPassword: Yup.string(),
    password: Yup.string(),
    password_confirmation: Yup.string(),
  })
}
