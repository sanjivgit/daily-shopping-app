import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { login } from '@/stores/slices/auth-slice';
import type { AppDispatch } from '@/stores';
import { useLogin } from './service/useAuthApi';
import { toast } from 'sonner';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const loginMutation = useLogin()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (!formData.email || !formData.password) {
            toast('Please fill in all fields')
            return
        }

        loginMutation.mutate({
            email: formData.email,
            password: formData.password
        }, {
            onSuccess: (data) => {
                dispatch(login(data.data))
                navigate('/dashboard')
            }
        })
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}
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
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                        <div className="text-center text-sm">
                            Don't have an account?{' '}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Register
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
