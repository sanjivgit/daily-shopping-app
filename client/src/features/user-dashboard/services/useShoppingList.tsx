import APIs from "@/utils/apis"
import axiosInstance from "@/utils/axios-instance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface CreateListBody {
    title: string
}

interface UpdateListBody extends CreateListBody {
    listId: string
}

interface CreateOrderBody {
    vendorId: string,
    items: [
        {
            name: string,
            price: number,
            quantity: number
        }
    ],
    totalCost: number
    delivery: number
}

export const useGetList = () => {
    return useQuery({
        queryKey: [APIs.LIST.GET],
        queryFn: async () => {
            const res = await axiosInstance.get(APIs.LIST.GET)
            return res.data.data
        }
    })
}

export const useGetOrderList = () => {
    return useQuery({
        queryKey: [APIs.ORDERS.GET],
        queryFn: async () => {
            const res = await axiosInstance.get(APIs.ORDERS.GET)
            return res.data.data
        }
    })
}

export const useGetMatchedVendor = (listId: string) => {
    const [coord, setCoord] = useState<number[]>([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (data) => {
                const { longitude, latitude } = data.coords;

                // Example static coords
                // setCoord([85.1375645, 25.5940947]);

                setCoord([longitude, latitude]);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Location access is blocked. Please enable it from browser settings.");
                } else {
                    alert(error.message);
                }
            }
        );
    }, []);

    return useQuery({
        queryKey: [APIs.VENDOR.NEARBY],
        queryFn: async () => {
            const res = await axiosInstance.get(APIs.VENDOR.NEARBY + `${listId}?longitude=${coord[0]}&latitude=${coord[1]}`)
            return res.data.data
        },
        enabled: !!coord.length
    })
}

export const useCreateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: CreateListBody) => {
            const res = await axiosInstance.post(APIs.LIST.CREATE, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("List created successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.LIST.GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to create list")
        },
    })
}

export const useUpdateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpdateListBody) => {
            const res = await axiosInstance.put(APIs.LIST.UPDATE, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("List updated successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.LIST.GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to update list")
        },
    })
}

export const useDeleteList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (listId: string) => {
            const res = await axiosInstance.delete(APIs.LIST.DELETE + `${listId}`)

            return res.data
        },
        onSuccess: () => {
            toast.success("List deleted successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.LIST.GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to delete list")
        },
    })
}

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: async (body: CreateOrderBody) => {
            const { data } = await axiosInstance.post(APIs.ORDERS.CREATE, body)

            return data.data
        },
        onSuccess: () => {
            toast.success("Order successfully!")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Payment Failed")
        },
    })
}

export const usePayment = () => {
    return useMutation({
        mutationFn: async (amount: number) => {
            const { data } = await axiosInstance.post(APIs.PAYMENT.CREATE_ORDER, {
                amount,
            });

            return data.data
        },
        onSuccess: () => {
            toast.success("Payment successfully!")
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Payment Failed")
        },

    })
}
