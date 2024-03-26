import { useCreateRestaurant, useGetMyRestaurantOrders, useGetRestaurant } from "@/api/RestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/ManageRestaurantForm";

export default function ManageRestaurantPage() {

    const { createRestaurant, isLoading } = useCreateRestaurant()
    const { restaurant } = useGetRestaurant()
    const { orders } = useGetMyRestaurantOrders()

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent
                value="orders"
                className="space-y-5 bg-gray-50 pg-10 rounded-lg"
            >
                <h2 className="text-2xl font-bold">{orders?.length} Active Orders</h2>
                {
                    orders?.map(order => (
                        <OrderItemCard order={order} />
                    ))
                }
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                    restaurant={restaurant}
                    onSave={createRestaurant}
                    isLoading={isLoading}
                />
            </TabsContent>
        </Tabs>
    )
}