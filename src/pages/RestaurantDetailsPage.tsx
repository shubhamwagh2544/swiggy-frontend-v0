import { useGetSearchedRestaurant } from "@/api/SearchApi";
import MenuItemComponent from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

export default function RestaurantDetailsPage() {

    const { restaurantId } = useParams()
    const { restaurant, isLoading } = useGetSearchedRestaurant(restaurantId)

    if (isLoading || !restaurant) {
        return <span>Loading...</span>
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    alt="restaurant_image"
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tighter">Menu</span>
                    {
                        restaurant.menuItems.map((menuItem) => (
                            <MenuItemComponent menuItem={menuItem} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}