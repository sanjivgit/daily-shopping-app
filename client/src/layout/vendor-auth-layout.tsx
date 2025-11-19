import type { AppDispatch } from '@/stores'
import { loadVendor } from '@/stores/slices/vendor-auth-slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'

export default function VendorAuthLayout() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('vendor')

        if (storedUser) {
            try {
                const user = JSON.parse(storedUser)

                dispatch(loadVendor(user))
                navigate('/vendor-dashboard')
            } catch (e) {
                console.error('Failed to load user from storage')
            }
        } else {
            navigate('/vendor/login')
        }
    }, [dispatch])

    return <><Outlet /></>
}
