import { Restaurant } from "@/types"
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