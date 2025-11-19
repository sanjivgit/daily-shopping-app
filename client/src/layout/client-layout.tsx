import type { AppDispatch } from '@/stores'
import { loadUser } from '@/stores/slices/auth-slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'

export default function ClientLayout() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')

        if (storedUser) {
            try {
                const { user } = JSON.parse(storedUser)

                dispatch(loadUser(user))

                if (location.pathname === '/') {

                    navigate('/dashboard')
                }
            } catch (e) {
                console.error('Failed to load user from storage')
            }
        } else {
            navigate('/login')
        }
    }, [dispatch])

    return <><Outlet /></>
}
