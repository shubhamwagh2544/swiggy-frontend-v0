import { useSearchRestaurants } from "@/api/SearchApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

export default function SearchPage() {

    const { city } = useParams()
    const { restaurants, isLoading } = useSearchRestaurants(city)

    if (!restaurants?.data || !city) {
        return <span>No results found...</span>
    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisine-list">
                cuisine list
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchResultInfo total={restaurants.pagination.total} city={city} />
                {restaurants.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))
                    }
            </div>
        </div>
    )
}