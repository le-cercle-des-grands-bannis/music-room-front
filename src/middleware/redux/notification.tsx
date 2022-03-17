import { createSlice } from '@reduxjs/toolkit'

export type StoreType = {
    payload: string | null;
    error: string | null;
    openNotif: boolean;
}

const initialState: StoreType = {
    payload: null,
    error: null,
    openNotif: true,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        fetchPayload: (state, action) => {
            state.payload = action.payload
            state.openNotif = Boolean(action.payload)
        },
        fetchError: (state, action) => {
            state.payload = null
            state.error = action.payload
            state.openNotif = Boolean(action.payload)
        },
        openCloseNotif: (state, action) => {
            state.payload = action.payload ? state.payload : null
            state.error = action.payload ? state.error : null
            state.openNotif = action.payload
        },
    }
})

export const { fetchPayload, fetchError, openCloseNotif } = notificationSlice.actions
export default notificationSlice.reducer