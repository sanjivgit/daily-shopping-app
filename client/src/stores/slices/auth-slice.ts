import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: string
    name: string
    email: string
    location: {
        coordinates: number[]
    }
}

interface AuthState {
    isAuthenticated: boolean
    user: User | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem('user')
        },
        loadUser: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
    },
})

export const { register, login, logout, loadUser } = authSlice.actions
export default authSlice.reducer
