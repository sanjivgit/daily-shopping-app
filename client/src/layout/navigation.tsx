import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import type { AppDispatch, RootState } from '@/stores'
import { Outlet, useNavigate } from 'react-router-dom'
import { logout as vendorLogout } from '@/stores/slices/vendor-auth-slice'
import { logout } from '@/stores/slices/auth-slice'

export default function Navigation() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(vendorLogout())
        navigate('/login')
    }

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a href="/" className="text-2xl font-bold text-blue-600">
                            SmartShop
                        </a>
                        <div className="flex items-center gap-6">
                            <span className="text-gray-700">{user?.name}</span>
                            <Button onClick={handleLogout} variant="outline">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
