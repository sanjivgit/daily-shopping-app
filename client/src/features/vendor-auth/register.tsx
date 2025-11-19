import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useRegister } from './service/useAuthApi'
import { toast } from 'sonner'

export default function VendorRegister() {
    const navigate = useNavigate()

    const registerMutateion = useRegister()

    const [formData, setFormData] = useState({
        shopName: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (!formData.shopName || !formData.email || !formData.password) {
            toast('Please fill in all fields')
            return
        }

        navigator.geolocation.getCurrentPosition((data) => {
            const { longitude, latitude } = data.coords;

            const newFormData = {
                shopName: formData.shopName,
                email: formData.email,
                password: formData.password,
                location: {
                    coordinates: [Number(longitude), Number(latitude)]
                }
            }

            registerMutateion.mutate(newFormData, {
                onSuccess: () => {
                    navigate('/vendor/login')
                }
            })
        }, (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Location access is blocked. Please enable it from browser settings.");
            }
        })
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Sign up to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium">Shop Name</label>
                            <Input
                                type="text"
                                name="shopName"
                                placeholder="General Store"
                                value={formData.shopName}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div>
                        {/* <div>
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="San Francisco, CA"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div> */}
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <a href="/vendor/login" className="text-blue-600 hover:underline">
                                Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
