import { useSearchRestaurants } from "@/api/SearchApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string
}

export default function SearchPage() {

    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: ''
    })
    const { restaurants, isLoading } = useSearchRestaurants(searchState, city)

    if (!restaurants?.data || !city) {
        return <span>No results found...</span>
    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    function setSearchQuery(searchFormData: SearchForm) {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }))
    }

    function resetSearch() {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: ""
        }))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisine-list">
                cuisine list
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeholder="Search by cuisine, restaurant name, or dish..."
                    onReset={resetSearch}
                />
                <SearchResultInfo total={restaurants.pagination.total} city={city} />
                {restaurants.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))
                }
            </div>
        </div>
    )
}