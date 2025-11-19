import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Vendor {
    id: string
    name: string
    email: string
    location: string
}

interface AuthState {
    isAuthenticated: boolean
    vendor: Vendor | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    vendor: null,
}

const vendorAuthSlice = createSlice({
    name: 'vendor-auth',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<Vendor>) => {
            state.isAuthenticated = true
            state.vendor = action.payload
            localStorage.setItem('vendor', JSON.stringify(action.payload))
        },
        login: (state, action: PayloadAction<Vendor>) => {
            state.isAuthenticated = true
            state.vendor = action.payload
            localStorage.setItem('vendor', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.vendor = null
            localStorage.removeItem('vendor')
        },
        loadVendor: (state, action: PayloadAction<Vendor>) => {
            state.isAuthenticated = true
            state.vendor = action.payload
        },
    },
})

export const { register, login, logout, loadVendor } = vendorAuthSlice.actions
export default vendorAuthSlice.reducer
