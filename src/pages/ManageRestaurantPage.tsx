import { useCreateRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/ManageRestaurantForm";

export default function ManageRestaurantPage() {

    const { createRestaurant, isLoading } = useCreateRestaurant()

    return (
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading}/>
    )
}