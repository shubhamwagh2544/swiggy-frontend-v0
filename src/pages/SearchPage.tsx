import { useSearchRestaurants } from "@/api/SearchApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string
    page: number
    selectedCuisine: string[]
    sortOption: string
}

export default function SearchPage() {

    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: '',
        page: 1,
        selectedCuisine: [],
        sortOption: 'bestMatch'
    })
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

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
            searchQuery: searchFormData.searchQuery,
            page: 1
        }))
    }

    function setSelectedCuisines(selectedCuisine: string[]) {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisine,
            page: 1,
        }))
    }

    function setSortOption(sortOption: string) {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1
        }));
    }

    function setPage(page: number) {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    };

    function resetSearch() {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1
        }))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisine-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisine}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() =>
                        setIsExpanded((prevIsExpanded) => !prevIsExpanded)
                    }
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeholder="Search by cuisine, restaurant name, or dish..."
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={restaurants.pagination.total} city={city} />
                    <SortOptionDropdown
                        sortOption={searchState.sortOption}
                        onChange={(value) => setSortOption(value)}
                    />
                </div>
                {
                    restaurants.data.map((restaurant) => (
                        <SearchResultCard restaurant={restaurant} />
                    ))
                }
                <PaginationSelector
                    page={restaurants.pagination.page}
                    pages={restaurants.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}