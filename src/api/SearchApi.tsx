import { SearchState } from "@/pages/SearchPage"
import { RestaurantSearchResponse } from "@/types"
import axios from "axios"
import { useQuery } from "react-query"
//import { URLSearchParams } from "url"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {

        //const params = new URLSearchParams()
        //params.set('searchQuery', searchState.searchQuery)

        let url = city ? `${API_BASE_URL}/api/search/${city}` : `${API_BASE_URL}/api/search`
        const encodedSearchQuery = encodeURIComponent(searchState.searchQuery.trim())
        const encodedPageQuery = encodeURIComponent(searchState.page.toString())
        const encodedSelectedCuisines = searchState.selectedCuisine.map(cuisine => encodeURIComponent(cuisine)).join(',')
        const encodedSortOption = encodeURIComponent(searchState.sortOption)

        if (encodedSearchQuery || encodedPageQuery || encodedSelectedCuisines || encodedSortOption) {
            url += `?searchQuery=${encodedSearchQuery}&page=${encodedPageQuery}&selectedCuisines=${encodedSelectedCuisines}&sortOption=${encodedSortOption}`
        }

        const response = await axios.get(url)

        if (!response.data) {
            throw new Error('Error searching restaurants')
        }

        return response.data
    }

    const {
        data: restaurants,
        isLoading,
    } = useQuery(
        ['searchRestaurants', searchState],
        createSearchRequest,
        { enabled: !!city }
    )

    return {
        restaurants,
        isLoading
    }
}