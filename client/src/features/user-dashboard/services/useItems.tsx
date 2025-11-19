import APIs from "@/utils/apis"
import axiosInstance from "@/utils/axios-instance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateItemBody {
    listId: string;
    name: string;
    quantity: number;
    brandPreference: string;
}

interface UpdateListBody {
    itemId: string
    itemName: string;
    quantity: number;
    brandPreference: string;
}

export const useGetItem = (listId: string) => {
    return useQuery({
        queryKey: [APIs.ITEMS.GET, listId],
        queryFn: async () => {
            const res = await axiosInstance.get(APIs.ITEMS.GET + `${listId}`)
            return res.data.data
        },
        enabled: !!listId,
    })
}

export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: CreateItemBody) => {
            const res = await axiosInstance.post(APIs.ITEMS.CREATE, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("Item created successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.ITEMS.GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to create item")
        },
    })
}

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpdateListBody) => {
            const res = await axiosInstance.put(APIs.ITEMS.UPDATE, body)

            return res.data
        },
        onSuccess: () => {
            toast.success("Item updated successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.ITEMS.GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to update item")
        },
    })
}

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (itemId: string) => {
            const res = await axiosInstance.delete(APIs.ITEMS.DELETE + `${itemId}`)

            return res.data
        },
        onSuccess: () => {
            toast.success("Item deleted successfully!")
            queryClient.invalidateQueries({ queryKey: [APIs.ITEMS.GET] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message || error.message || "Failed to delete item")
        },
    })
}
