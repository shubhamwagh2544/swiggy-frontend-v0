import { RestaurantSearchResponse } from "@/types"
import axios from "axios"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const useSearchRestaurants = (city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const response = await axios.get(`${API_BASE_URL}/api/search/${city}`)
        if (!response.data) {
            throw new Error('Error searching restaurants')
        }
        return response.data
    }

    const {
        data: restaurants,
        isLoading,
    } = useQuery('searchRestaurants', createSearchRequest, {
        enabled: !!city
    })

    return {
        restaurants,
        isLoading
    }
}