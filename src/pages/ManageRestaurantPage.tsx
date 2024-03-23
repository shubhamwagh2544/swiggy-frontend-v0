import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/ManageRestaurantForm";

export default function ManageRestaurantPage() {

    const { createRestaurant, isLoading } = useCreateRestaurant()
    const { restaurant } = useGetRestaurant()

    return (
        <ManageRestaurantForm
        restaurant={restaurant} 
        onSave={createRestaurant} 
        isLoading={isLoading} 
        />
    )
}