import { Order, Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createRestaurantRequest = async (restaurant: FormData): Promise<Restaurant> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await axios.post(`${API_BASE_URL}/api/restaurant`, restaurant, {
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
        })
        if (!response.data) {
            throw new Error('Error creating restaurant')
        }
        return response.data
    }

    const {
        mutateAsync: createRestaurant,
        isLoading,
        isSuccess,
        isError,
        error
    } = useMutation(createRestaurantRequest)

    if (isSuccess) {
        toast.success('Restaurant created successfully')
    }
    if (error) {
        toast.error('Error creating restaurant')
    }

    return {
        createRestaurant,
        isLoading,
        isSuccess,
        isError,
        error
    }
}

export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getRestaurantRequest = async (): Promise<Restaurant> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await axios.get(`${API_BASE_URL}/api/restaurant`, {
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
        })
        if (!response.data) {
            throw new Error('Error fetching restaurant')
        }
        return response.data
    }

    const {
        data: restaurant,
        isLoading,
        isSuccess,
        isError,
        error
    } = useQuery('getRestaurant', getRestaurantRequest)

    return {
        restaurant,
        isLoading,
        isSuccess,
        isError,
        error
    }
}

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await axios.get(`${API_BASE_URL}/api/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
        })
        if (!response.data) {
            throw new Error('Error fetching restaurant orders')
        }
        return response.data
    }

    const {
        data: orders,
        isLoading,
    } = useQuery('getMyRestaurantOrders', getMyRestaurantOrdersRequest)

    return {
        orders,
        isLoading
    }
}

type UpdateOrderStatusRequest = {
    orderId: string
    status: string
}

export const useUpdateOrderStatus = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateOrderStatusRequest = async (updateOrderStatusRequest: UpdateOrderStatusRequest): Promise<Order> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await axios.patch(
            `${API_BASE_URL}/api/restaurant/order/${updateOrderStatusRequest.orderId}/status`,
            { status: updateOrderStatusRequest.status }, {
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"
            }
        })
        if (!response.data) {
            throw new Error('Error updating order status')
        }
        return response.data
    }

    const {
        mutateAsync: updateOrderStatus,
        isLoading,
        isSuccess,
        isError,
        error,
        reset
    } = useMutation(updateOrderStatusRequest)

    if (isSuccess) {
        toast.success('Order status updated successfully')
    }
    if (error) {
        toast.error('Error updating order status')
        reset()
    }

    return {
        updateOrderStatus,
        isLoading,
        isSuccess,
        isError,
        error
    }
}