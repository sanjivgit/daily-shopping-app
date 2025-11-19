import APIs from "@/utils/apis"
import vendorAxiosInstance from "@/utils/axios-instance-vendor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateStockBody {
    itemName: string;
    price: number;
    availableQty: string;
}

interface UpdateListBody {
    itemId: string
    availableQty: number;
}

export const useGetStock = (pageNo: number) => {
    return useQuery({
        queryKey: [APIs.VENDOR.STOCK__GET],
        queryFn: async () => {
            const res = await vendorAxiosInstance.get(APIs.VENDOR.STOCK__GET + `?limit=10&page=${pageNo}`)
            return res.data.data
        },
    })
}

export const useCreateStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: CreateStockBody) => {
            const res = await vendorAxiosInstance.post(APIs.VENDOR.STOCK, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("Stock created successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.VENDOR.STOCK__GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to create stock")
        },
    })
}

export const useUpdateStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpdateListBody) => {
            const res = await vendorAxiosInstance.put(APIs.VENDOR.STOCK__UPDATE, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("Stock updated successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.VENDOR.STOCK__GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to update stock")
        },
    })
}

export const useDeleteStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (stockId: string) => {
            const res = await vendorAxiosInstance.delete(APIs.VENDOR.STOCK__DELETE + `${stockId}`)

            return res.data
        },
        onSuccess: () => {
            toast.success("Stock deleted successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.VENDOR.STOCK__GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to delete stock")
        },
    })
}
