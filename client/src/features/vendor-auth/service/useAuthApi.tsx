import APIs from "@/utils/apis"
import axiosInstance from "@/utils/axios-instance"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface RegisterBody {
    shopName: string
    email: string
    password: string
    location: {
        coordinates: number[]
    }
}

interface LoginBody {
    email: string
    password: string
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (body: RegisterBody) => {
            const res = await axiosInstance.post(APIs.VENDOR.REGISTER, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("Vendor registered successfully!")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to register user")
        },
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (body: LoginBody) => {
            const res = await axiosInstance.post(APIs.VENDOR.LOGIN, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("Vendor LogedIn successfully!")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to login")
        },
    })
}
