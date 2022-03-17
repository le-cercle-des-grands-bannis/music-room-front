import { createSlice } from '@reduxjs/toolkit'

export interface ILoginState {
    username: string | null;
    password:  string | null;
    isButtonDisabled: boolean;
    helperText: string | null;
    isError: boolean;
}

const initialState: ILoginState = {
    username: null,
    password: null,
    isButtonDisabled: true,
    helperText: null,
    isError: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setIsButtonDisabled: (state, action) => {
            state.isButtonDisabled = action.payload
        },
        loginSuccess: (state, action) => {
            state.helperText = action.payload
            state.isError = false
        },
        loginFailed: (state, action) => {
            state.helperText = action.payload
            state.isError = true
        },
        setIsError: (state, action) => {
            state.isError = action.payload
        },
    }
})

export const { setUsername, setPassword, setIsButtonDisabled, loginSuccess, loginFailed, setIsError } = loginSlice.actions
export default loginSlice.reducer